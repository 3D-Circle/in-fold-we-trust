import React, { Component } from 'react';
import './App.css';

const aminos = "HPHHPPPH";


function flatConfigFromSequence(seq) {
    let grid = Array(seq.length).fill(Array(seq.length));
    
}

flatConfigFromSequence("HPHPHP");

class App extends Component {
    render() {
	return (
	    <div id="wrapper">
	      <FoldingBoard gridSize={this.props.gridSize}/>
	    </div>
	);
    }
}


class FoldingBoard extends Component {
    constructor(props) {
	super();
	this.createGrid = this.createGrid.bind(this);
    }

    createGrid(gridSize, coords) {
	let result = [];

	let tdFactory = (y, gridSize) => {
	    return [...Array(gridSize*2 - 1)].map(
		(_, x) => {
		    let tds = [];
		    if ((y % 2 == 0) && (x % 2 == 0)) {	
			tds.push(
			    <div key={"" + x + y} className="td aa-cell">
			      <div className="aa white"></div>
			    </div>
			);
		    } else if ((x % 2) !== (y % 2)) {
			let customClass = (y % 2 == 0) ? "wide" : "tall";
			tds.push(
			    <div key={"" + x + y} className="td aa-link">
			      <div className={"link " + customClass}></div>
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


// {[...Array(this.props.gridSize)].map(
	      // 	  (_, y) =>
	      // 	      <tr key={y}>
	      // 		    {[...Array(this.props.gridSize)].map(
	      // 			(_, x) =>
	      // 			    <td key={"" + x + y} className="cell" id={"cell-" + x + y}>
	      // 				  <AminoAcid color={"white"}/>
	      // 			    </td>
	      // 		    )}
	      // 	      </tr>
	      // )}



class AminoAcid extends Component {
    render() {
        return (
	    <div className={"aa " + this.props.color}></div>
	);
    }
}

export default App;
