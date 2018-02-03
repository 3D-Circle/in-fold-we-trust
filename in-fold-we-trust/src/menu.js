import update from 'immutability-helper';
import React, {Component} from 'react'
import ReactModal from 'react-modal';
import Explanation from "./explanation";
import Tutorial from "./tutorial";


ReactModal.setAppElement('#root');

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            tutorialOpen: false,
            explanationOpen: false,
            language: "CN"
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(windowName, value) {
        this.setState(update(this.state, {
            [windowName + "Open"]: {$set: value}
        }));
    }

    render() {
        return <div id="menu">
            <button className="menu-item" onClick={() => this.toggleModal("tutorial", true)}>Tutorial</button>
            <button className="menu-item" onClick={() => this.toggleModal("explanation", true)}>Explanation</button>
            <ReactModal isOpen={this.state.tutorialOpen}
                        onRequestClose={() => this.toggleModal("tutorial", false)}>
                <Tutorial closingCallback={() => this.toggleModal("tutorial", false)}
                          language={this.state.language}/>
            </ReactModal>
            <ReactModal isOpen={this.state.explanationOpen}
                        onRequestClose={() => this.toggleModal("explanation", false)}>
                <Explanation closingCallback={() => this.toggleModal("explanation", false)}
                             language={this.state.language}/>
            </ReactModal>
        </div>;
    }
}

export default Menu
