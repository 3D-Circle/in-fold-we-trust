import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    configFromSequence, linkLocationGen,
    aminos, findPossibleRotation,
    getFoldingIndicators, gridFromCoordMap
} from './foldUtils.js';
import './App.css';



class App extends Component {
    render() {
	return (
	    <div id="wrapper">
	      <FoldingBoard gridSize={this.props.gridSize} aminoString={aminos}/>
	    </div>
	);
    }
}


class FoldingBoard extends Component {
    constructor(props) {
	super(props);
	
	this.createGrid = this.createGrid.bind(this);
	this.aminoClick = this.aminoClick.bind(this);
	this.generateFoldingIndicators = this.generateFoldingIndicators.bind(this);
	this.foldingIndicatorClick = this.foldingIndicatorClick.bind(this);
	this.resetToNormalState = this.resetToNormalState.bind(this);
	
	let r = configFromSequence(this.props.aminoString);
	this.state = {
	    aminoCoordMap: r[0],
	    grid: r[1],
 	    foldingIndicators: new Map(),
	    currentPossibleRotations: new Map(),
	    foldingStep: "normal",  // "normal", "chooseRotation", "choseDirection"
	    selectedAmino: "",
	    rotationAmino: ""
	};
    }


    aminoClick(coords) {
	if (this.state.foldingStep === "normal") {
	    // selection of origin	    
	    this.setState({
		selectedAmino: coords,
		foldingStep: "chooseRotation"
	    });
	} else if (this.state.foldingStep === "chooseRotation") {
	    this.setState({
		rotationAmino: coords,
		foldingStep: "choseDirection"
	    }, this.generateFoldingIndicators);
	}
	// else no need to react (excellent pun n'est-ce pas ?)
    }

    generateFoldingIndicators() {
	let possibleRotations = new Map([-1, 1].map((direction) => [direction, findPossibleRotation(
	    this.state.aminoCoordMap,
	    this.state.selectedAmino,
	    this.state.rotationAmino,
	    direction,
	    this.state.grid.length
	)]));
	
	// generate the positions for folding indicators
	console.log("POSSIBLE ROTATIONS");
	console.log(possibleRotations);
	let positions = getFoldingIndicators(
	    this.state.selectedAmino, this.state.rotationAmino,
	    this.state.grid.length, possibleRotations
	);

	if (positions.size === 0) {
	    this.resetToNormalState();
	} else {
	    console.log("CURRENT FOLDING INDICATORS");
	    console.log(positions);
	    this.setState({
		foldingIndicators: positions,
		currentPossibleRotations: possibleRotations
	    });
	}
    }

    foldingIndicatorClick(direction) {
	let newAminos = this.state.currentPossibleRotations.get(direction);
	this.setState({
	    aminoCoordMap: newAminos,
	    grid: gridFromCoordMap(newAminos, this.state.grid.length)
	}, this.resetToNormalState);  // we reset to step 0
    }

    resetToNormalState() {
	console.log("RESET TO NORMAL STATE");
	this.setState({
	    foldingIndicators: new Map(),
	    currentPossibleRotations: new Map(),
	    foldingStep: "normal",  // "normal", "chooseRotation", "choseDirection"
	    selectedAmino: "",
	    rotationAmino: ""
	});
    }
    
    createGrid(gridSize) {
	let result = [];
	let joins = linkLocationGen(this.state.aminoCoordMap);
	let tdFactory = (y, gridSize) => {
	    return [...Array(gridSize*2 - 1)].map((_, x) => {
		let tds = [];
		if ((y % 2 === 0) && (x % 2 === 0)) {
		    // checking if there is an AA at this location of the grid
		    let gridElementAtPos = this.state.grid[x/2][y/2];
		    let isActive = false;
		    if (this.state.selectedAmino === x/2 + "-" + y/2) {
			isActive = true;
		    }
		    let foldingIndicatorDirection = this.state.foldingIndicators.get(x/2 + "-" + y/2);
		    tds.push(
			<AminoAcidCell key={"" + x + y} hp={gridElementAtPos}
				       foldingIndicatorDirection={foldingIndicatorDirection}
				       coords={x/2 + "-" + y/2}
				       aminoClickCallback={this.aminoClick} isActive={isActive}
				       indicatorClickCallback={this.foldingIndicatorClick}/>
		    );
		} else if ((x % 2) !== (y % 2)) {
		    let orientationClass = (y % 2 === 0) ? "wide" : "tall";
		    let singleLink;
		    
		    if (orientationClass === "wide") {
 			singleLink = [[(x-1)/2, y/2].join("-"), [(x+1)/2, y/2].join("-")];
		    } else {
			singleLink = [[x/2, (y-1)/2].join("-"), [x/2, (y+1)/2].join("-")];
		    }
		    let linkIsActive = joins.includes(singleLink.join("--"))
			|| joins.includes([...singleLink].reverse().join("--"));

		    tds.push( // TODO: shrink the links
			    <div key={"" + x + y} className={["td", "aa-link", orientationClass].join(" ")}>  
			    <div className={["link", linkIsActive ? "active" : ""].join(" ")}/>
			    </div>
		    );
		} else {
		    tds.push(<div key={"" + x + y} className="td empty"></div>);
		}
		return tds;
	    });
	};

	for (let y = 0; y < gridSize*2 - 1; y++) {
	    result.push(
		<div key={"row" + y} className="tr">
		  {tdFactory(y, gridSize)}
		</div>
	    );
	}
	return result;
    }
    
    render() {
	return this.createGrid(10);
    }
}

FoldingBoard.propTypes = {
    gridSize: PropTypes.number.isRequired,
    aminoString: PropTypes.string.isRequired
};


class AminoAcidCell extends Component {
    constructor(props) {
	super(props);
    }

    generateCellContent() {
	let cellContent = undefined;
	if (this.props.hp !== undefined) {
	    cellContent =
		<AminoAcid isActive={this.props.isActive}
	                   hp={this.props.hp} coords={this.props.coords}
	                   aminoClickCallback={this.props.aminoClickCallback}/>;
	} else if (this.props.foldingIndicatorDirection !== undefined) {
	    cellContent =
		<FoldingIndicator direction={this.props.foldingIndicatorDirection}
	                          indicatorClickCallback={this.props.indicatorClickCallback}/>;
	}
	return cellContent;
    }

    render() {
	return (
	    <div className={["td", "aa-cell", this.props.isActive ? "active" : ""].join(" ")}>
	      {this.generateCellContent.bind(this)()}
	    </div>
	);
    }
}

AminoAcidCell.propTypes = {
    coords: PropTypes.string.isRequired, // "x-y"
    isActive: PropTypes.bool.isRequired,
    hp: PropTypes.string,
    aminoClickCallback: PropTypes.func,
    indicatorClickCallback: PropTypes.func,
    foldingIndicatorDirection: PropTypes.number
};


class AminoAcid extends Component {
    constructor(props) {
	super(props);
    }
    
    render() {
        return (
	    <div className={["aa", this.props.hp].join(" ")}
		 onClick={() => this.props.aminoClickCallback(this.props.coords)}>
            </div>
	);
    }
}

AminoAcid.propTypes = {
    isActive: PropTypes.bool.isRequired,
    coords: PropTypes.string.isRequired,
    hp: PropTypes.string.isRequired,
    aminoClickCallback: PropTypes.func.isRequired
};


class FoldingIndicator extends Component {
    render() {
	return (
	    <div className="folding-indicator"
		 onClick={() => this.props.indicatorClickCallback(this.props.direction)}/>
	);
    }
}

FoldingIndicator.propTypes = {
    direction: PropTypes.number.isRequired,  // either +1 or -1
    indicatorClickCallback: PropTypes.func.isRequired
};

export default App;
