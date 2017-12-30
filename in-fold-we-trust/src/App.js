import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render() {
	return (
	    <FoldingBoard gridSize={this.props.gridSize}/>
	);
    }
}


class FoldingBoard extends Component {
    render() {
	return (
	    <table>
	    <tbody>
	      {[...Array(this.props.gridSize)].map(
		  (_, y) =>
		      <tr key={y}>
			    {[...Array(this.props.gridSize)].map(
				(_, x) =>
				    <td key={"" + x + y} className="cell" id={"cell-" + x + y}>
					  <AminoAcid color={"white"}/>
				    </td>
			    )}
		      </tr>
	      )}
	    </tbody>
	    </table>
	);
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
