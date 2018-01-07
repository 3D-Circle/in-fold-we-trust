import React, {Component} from 'react';
import './App.css';
import Menu from "./menu";
import FoldingBoard from "./foldingBoard";


/* 
   -- Terminology
   Amino / AminoAcid / AA = the colourful circles
   HP / Hydrophobic vs Polar = whether the AA needs to be inside or outside
   FoldingIndicators = blue squares on which the user clicks to chose his folding direction
*/


class App extends Component {
    render() {
        return (
            <div id="wrapper">
                <div id="title">HP Folding</div>
                <Menu/>
                <FoldingBoard/>
            </div>
        );
    }
}


export default App;
