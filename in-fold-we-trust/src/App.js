import React, { Component } from 'react';
import './App.css';

const aminos = "HPHHPPPH";


/* --- Utility functions --- */

function flatConfigFromSequence(seq) {
    let grid = 	Array(seq.length + 2)
	.fill().map(()=>Array(seq.length + 2).fill()); // to avoid the [None] * x syndrome
    let aminoCoordObj = {};
    let middle = Math.floor(seq.length / 2);
    seq.split("").map((element, x) => {
	grid[x + 1][middle] = element;
	aminoCoordObj["" + (x + 1) + middle] = element;
    }); // its raising warning about not returning anything, should we care ?
    return [aminoCoordObj, grid];
}


function linkLocationGen(aminoCoordObj) {
    // returns: list of coords of each link
    let result = [];
    let allCoords = Object.keys(aminoCoordObj);
    allCoords.map(
	(key, index) => {
	    if (index !== allCoords.length) {
		result.push("" + key + allCoords[index + 1]);
	    }
	}
    );
    return result;
}



/* --- Componenents --- */

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

	let r = flatConfigFromSequence(this.props.aminoString);
	this.state = {
	    aminoCoordsList: r[0],
	    grid: r[1]
	};
    }

    createGrid(gridSize, coords) {
	let result = [];

	let tdFactory = (y, gridSize) => {
	    return [...Array(gridSize*2 - 1)].map(
		(_, x) => {
		    let tds = [];
		    if ((y % 2 === 0) && (x % 2 === 0)) {
			// checking if there is an AA at this location of the grid
			let gridElementAtPos = this.state.grid[x/2][y/2];
			let elementInside =  gridElementAtPos !== undefined ?
			    <AminoAcid hp={gridElementAtPos}/> : undefined;

			tds.push(
			    <div key={"" + x + y} className="td aa-cell">
			      {elementInside}
			    </div>
			);
		    } else if ((x % 2) !== (y % 2)) {
			let orientationClass = (y % 2 === 0) ? "wide" : "tall";
			let joins = linkLocationGen(this.state.aminoCoordsList);
			
			let singleLink;
			if (y % 2 === 0) {
			    singleLink = ["" + (x-1)/2 + y/2, "" + (x+1)/2 + y/2];
			} else {
			    singleLink = ["" + x/2 + (y-1)/2, "" + x/2 + (y+1)/2];
			}
			
			let linkIsActive = joins.includes(singleLink.join(""))
			    || joins.includes([...singleLink].reverse().join(""));
			
			tds.push( // TODO: shrink the links
			    <div key={"" + x + y} className="td aa-link">  
				<div className={
				    ["link", orientationClass, linkIsActive ? "active" : ""].join(" ")
				}></div>
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
	return this.createGrid(10, []);
    }
}



class AminoAcid extends Component {
    render() {
        return (
	    <div className={"aa " + this.props.hp}></div>
	);
    }
}

export default App;
