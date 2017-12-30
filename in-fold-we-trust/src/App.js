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
	    <FoldingBoard gridSize={this.props.gridSize}/>
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
			    <td key={"" + x + y} className="aa-cell">
			      <div className="aa white"></div>
			    </td>
			);
		    } else if ((x % 2) !== (y % 2)) {
			let customClass = (y % 2 == 0) ? "wide" : "tall";
			tds.push(
			    <td key={"" + x + y} className="aa-link">
			      <div className={"link " + customClass}></div>
			    </td>
			);
		    } else {
			tds.push(<td key={"" + x + y} className="empty"></td>);
		    }
		    return tds;
		}	    
	    );
	};

	for (let y = 0; y < gridSize*2 - 1; y++) {
	    result.push(
		<tr key={"row" + y}>
		  {tdFactory(y, gridSize)}
		</tr>
	    );
	}
	return result;
    }
    
    render() {
	return (
	    <table>
	    <tbody>
	      {this.createGrid(10, [])}
	    </tbody>
	    </table>
	);
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
