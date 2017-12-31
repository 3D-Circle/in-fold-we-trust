import React, { Component } from 'react';
import './App.css';

const aminos = "HPHHPPPH";


function flatConfigFromSequence(seq) {
    let grid = 	Array(seq.length + 2)
	.fill().map(()=>Array(seq.length + 2).fill()); // to avoid the [None] * x syndrome
    let aminoCoordList = {};
    let middle = Math.floor(seq.length / 2);
    seq.split("").map((element, x) => {
	grid[x + 1][middle] = element;
	aminoCoordList["" + x + middle] = element;
    }); 
    return [aminoCoordList, grid];
}


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
		    if ((y % 2 == 0) && (x % 2 == 0)) {
			let elementInside = this.state.grid[x/2][y/2] !== undefined ?
			    <div className="aa white"></div> : undefined;

			tds.push(
			    <div key={"" + x + y} className="td aa-cell">
			      {elementInside}
			    </div>
			);
		    } else if ((x % 2) !== (y % 2)) {
			let customClass = (y % 2 == 0) ? "wide" : "tall";
			let joins;
			if (y % 2 == 0) {
			    joins = [(x-1)/2, y/2, "-to-", (x+1)/2, y/2].join("");
			} else {
			    joins = [x/2, (y-1)/2, "-to-", x/2, (y+1)/2].join("");
			}
			console.log(joins);
			tds.push( // TODO: shrink the links
			    <div key={"" + x + y} className="td aa-link">  
			      <div className={"link " + customClass + " " + joins}></div>
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
	    <div className={"aa " + this.props.color}></div>
	);
    }
}

export default App;
