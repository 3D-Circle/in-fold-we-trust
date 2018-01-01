import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { configFromSequence, linkLocationGen, aminos } from './foldUtils.js';
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

	let r = configFromSequence(this.props.aminoString);
	this.state = {
	    aminoCoordsList: r[0],
	    grid: r[1],
	    foldingIndicators: [],
	    foldingStep: "normal"  // "normal", "chooseRotation", "choseDirection"
	};
    }

    findPossibleRotations() {
	// TODO
    }

    
    createGrid(gridSize) {
	let result = [];
	let tdFactory = (y, gridSize) => {
	    return [...Array(gridSize*2 - 1)].map(
		(_, x) => {
		    let tds = [];
		    if ((y % 2 === 0) && (x % 2 === 0)) {
			// checking if there is an AA at this location of the grid
			let gridElementAtPos = this.state.grid[x/2][y/2];
			tds.push(<AminoAcidCell key={"" + x + y} hp={gridElementAtPos}/>);
		    } else if ((x % 2) !== (y % 2)) {
			let orientationClass = (y % 2 === 0) ? "wide" : "tall";
			let joins = linkLocationGen(this.state.aminoCoordsList);	
			let singleLink;
			
			if (y % 2 === 0) {
			    singleLink = [[(x-1)/2, y/2].join("-"), [(x+1)/2, y/2].join("-")];
			} else {
			    singleLink = [[x/2, (y-1)/2].join("-"), [x/2 + (y+1)/2].join("-")];
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
		}	    
	    );
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
	super();
    }

    render() {
	return (
	    <div className="td aa-cell">
	      {this.props.hp !== undefined ? <AminoAcid hp={this.props.hp}/> : <FoldingIndicator/>}
	    </div>
	);
    }
}

AminoAcidCell.propTypes = {
    hp: PropTypes.string
};


class AminoAcid extends Component {
    constructor(props) {
	super();
	this.onAminoAcidClick = this.onAminoAcidClick.bind(this);
    }

    onAminoAcidClick() {
	
    }
    
    render() {
        return (
	    <div className={"aa " + this.props.hp} onClick={this.onAminoAcidClick}></div>
	);
    }
}

AminoAcid.propTypes = {
    coords: PropTypes.array.isRequired,
    hp: PropTypes.string.isRequired
};


class FoldingIndicator extends Component {
    render() {
	return (
	    <div className="folding-indicator"></div>
	);
    }
}

FoldingIndicator.propTypes = {
    direction: PropTypes.isRequired  // either +1 or -1
};

export default App;
