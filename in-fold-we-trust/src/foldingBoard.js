import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import {
    calculateHHUpperBound,
    configFromSequence,
    findHHContact,
    findMapNeighbours,
    findPossibleRotation,
    getFoldingIndicators,
    gridFromCoordMap,
    linkLocationGen
} from './foldUtils.js';


const aminoConfigs = new Map([
    ["HPHHPPHP", -2],
    ["HPHPHPHPHPHH", -3],
    ["PHHHHPPPPPPHHHHHHH", -6],
    ["HHPPHPPHPPHPPHPPHPPHPPHH", -9]
]);

class Options extends Component {
    constructor() {
        super();
        this.selectCallback = this.selectCallback.bind(this);
        this.onInputEdit = this.onInputEdit.bind(this);
        this.state = {
            customMode: false,
            customInputString: ""
        }
    }

    selectCallback(event) {
        let newAminoString = event.target.value;
        this.setState(update(this.state, {
            customMode: {$set: newAminoString === "custom"}
        }));
        if (newAminoString !== "custom") {
            this.props.changeAminoStringCallback(newAminoString, this.props.aminoConfigs.get(newAminoString));
        }
    }

    onInputEdit(e) {
        this.setState(update(this.state, {
            customInputString: {$set: e.target.value}
        }))
    }

    render() {
        return (
            <div id="options">
                {/* Reset Button */}
                <button onClick={() => this.props.resetCallback(undefined, "previous")}>Reset Configuration</button>
                {/* Level selector */}
                <select name="aminoStringSelect" id="aminoStringSelect"
                        onChange={this.selectCallback}>
                    {Array.from(this.props.aminoConfigs.entries()).map(
                        ([aminoString, stability], ind) =>
                            <option value={aminoString} key={ind}>Level {ind + 1} ({aminoString})</option>
                    )}
                    <option value="custom">Custom input</option>
                </select>
                {/* Custom */}
                <br/>
                {this.state.customMode ?
                    <div id="options-custom-area">
                        <input type="text" placeholder="Custom HP string"
                               value={this.state.customInputString}
                               onChange={this.onInputEdit}
                               onKeyPress={(e) => e.key === 'Enter' ? this.props.changeAminoStringCallback(this.state.customInputString) : null}
                        />
                        <button onClick={() => this.props.changeAminoStringCallback(this.state.customInputString)}>
                            Apply custom
                        </button>
                    </div> : null}
            </div>
        );
    }
}

Options.propTypes = {
    resetCallback: PropTypes.func.isRequired,
    changeAminoStringCallback: PropTypes.func.isRequired,
    aminoConfigs: PropTypes.object.isRequired
};


class FoldingBoard extends Component {
    // The actual board where the folding happens
    constructor(props) {
        super(props);

        this.createGrid = this.createGrid.bind(this);
        this.aminoClick = this.aminoClick.bind(this);
        this.generateFoldingIndicators = this.generateFoldingIndicators.bind(this);
        this.foldingIndicatorClick = this.foldingIndicatorClick.bind(this);
        this.resetToNormalState = this.resetToNormalState.bind(this);
        this.resetConfig = this.resetConfig.bind(this);

        let defaultAminoString = "HPHHPPHP";
        let r = configFromSequence(defaultAminoString);
        this.state = {
            aminoString: defaultAminoString,
            gridSize: r[1].length,
            // a Map object with the structure:
            // { aminoCoords -> HP-property } (either "H" or "P")
            aminoCoordMap: r[0],
            // a 2d array to represent the board (only aminos inside)
            grid: r[1],
            // a Map object with the structure: { foldingIndicatorCoords -> rotation }
            // (either +1 or -1) (sens trigonometrique)
            foldingIndicators: new Map(),
            // the possible rotations, this is only used in the phase "chooseDirection"
            // structure: { direction -> resultingAminoCoordMap }  (after rotation)
            currentPossibleRotations: new Map(),
            // the current step in which the board is
            // "normal": if the user selected nothing
            // "chooseRotation": if the user has chosen an origin and is choosing the rotation point
            // "chooseDirection": the user is choosing the rotation direction
            foldingStep: "normal",
            selectedAmino: "",  // coords are as string, "x-y"
            rotationAmino: "",
            score: findHHContact(r[0]).length,
            optimalScore: -2
        };
    }

    resetConfig(newAminoString = this.state.aminoString, optimalScore = null) {
        let r = configFromSequence(newAminoString);
        if (newAminoString.replace(/H/g, '').replace(/P/g, '')) {
            // TODO improve warning
            window.alert("Cannot read custom input: HP string contains characters other than 'H' and 'P'.");
            return
        }
        this.setState(update(this.state, {
            aminoString: {$set: newAminoString},
            aminoCoordMap: {$set: r[0]},
            grid: {$set: r[1]},
            gridSize: {$set: r[1].length},
            optimalScore: {
                $set: optimalScore === "previous" ?
                    this.state.optimalScore : optimalScore || ' ≤ -' + calculateHHUpperBound(newAminoString)
            }
        }))
    }

    aminoClick(coords) {
        // This is the callback function when an amino is clicked
        if (this.state.foldingStep === "normal") {
            // selected origin
            this.setState(update(this.state, {
                selectedAmino: {$set: coords},
                foldingStep: {$set: "chooseRotation"}
            }));
        } else if (this.state.foldingStep === "chooseRotation") {
            // selected rotationAmino
            // find the neighbours of this amino on the chain
            let neighbourAminos = findMapNeighbours(
                this.state.aminoCoordMap, this.state.selectedAmino
            );
            if (coords === this.state.selectedAmino) {
                window.alert(
                    "Rotation amino cannot be the same as origin." +
                    "\nIf you want to cancel the operation, click on an empty cell" +
                    "\nIf you're confused, check out the tutorial."
                );
            } else if (neighbourAminos.includes(coords) === false) {
                this.setState(update(this.state, {
                    selectedAmino: {$set: coords},
                    foldingStep: {$set: "chooseRotation"}
                }));
            } else {
                this.setState(update(this.state, {
                    rotationAmino: {$set: coords},
                    foldingStep: {$set: "chooseDirection"}
                }), this.generateFoldingIndicators);
            }
        }
    }

    generateFoldingIndicators() {
        // This function generates the positions of the foldingIndicators
        // after the user has chose origin and rotation point
        let possibleRotations = new Map([-1, 1].map((direction) => [direction, findPossibleRotation(
            this.state.aminoCoordMap,
            this.state.selectedAmino,
            this.state.rotationAmino,
            direction,
            this.state.grid.length
        )]));

        // generate the positions for folding indicators
        let positions = getFoldingIndicators(
            this.state.selectedAmino, this.state.rotationAmino,
            this.state.grid.length, possibleRotations
        );

        if (positions.size === 0) {
            // there are no possible positions for foldingIndicator
            // which implies there are no legal rotations
            this.resetToNormalState();
        } else {
            // fold!
            this.setState(update(this.state, {
                foldingIndicators: {$set: positions},
                currentPossibleRotations: {$set: possibleRotations}
            }));
        }
    }

    foldingIndicatorClick(direction) {
        // Called when a foldingIndicator is clicked
        let newAminos = this.state.currentPossibleRotations.get(direction);
        this.setState(update(this.state, {
            aminoCoordMap: {$set: newAminos},
            grid: {$set: gridFromCoordMap(newAminos, this.state.grid.length)},
            score: {$set: findHHContact(newAminos).length}
        }), this.resetToNormalState);  // we reset to normal mode
    }

    resetToNormalState() {
        // this function is called when an operation is finished or aborted
        this.setState(update(this.state, {
            foldingIndicators: {$set: new Map()},
            currentPossibleRotations: {$set: new Map()},
            foldingStep: {$set: "normal"},
            selectedAmino: {$set: ""},
            rotationAmino: {$set: ""}
        }));
    }

    createGrid(gridSize) {
        // creates the folding board grid
        let result = [];
        let joins = linkLocationGen(this.state.aminoCoordMap);
        const HHs = findHHContact(this.state.aminoCoordMap);
        let tdFactory = (y, gridSize) => {
            return [...new Array(gridSize * 2 - 1)].map((_, x) => {
                let tds = [];
                if ((y % 2 === 0) && (x % 2 === 0)) {
                    // checking if there is an AA at this location of the grid
                    let gridElementAtPos = this.state.grid[x / 2][y / 2];
                    // checking if the aa is active
                    let isActive = this.state.selectedAmino === x / 2 + "-" + y / 2;
                    let isRotationOrigin = this.state.rotationAmino === x / 2 + "-" + y / 2;
                    // checking if there is a foldingIndicator
                    let foldingIndicatorDirection = this.state.foldingIndicators.get(x / 2 + "-" + y / 2);
                    tds.push(
                        <AminoAcidCell key={"" + x + y} hp={gridElementAtPos}
                                       foldingIndicatorDirection={foldingIndicatorDirection}
                                       coords={x / 2 + "-" + y / 2}
                                       aminoClickCallback={gridElementAtPos ? this.aminoClick : this.resetToNormalState}
                                       isActive={isActive}
                                       isRotationOrigin={isRotationOrigin}
                                       indicatorClickCallback={this.foldingIndicatorClick}/>
                    );
                } else if ((x % 2) !== (y % 2)) {  // its a link cell
                    let orientationClass = (y % 2 === 0) ? "wide" : "tall";
                    let singleLink;

                    if (orientationClass === "wide") {
                        singleLink = [`${(x - 1) / 2}-${y / 2}`, `${(x + 1) / 2}-${y / 2}`];
                    } else {
                        singleLink = [`${x / 2}-${(y - 1) / 2}`, `${x / 2}-${(y + 1) / 2}`];
                    }
                    // check if the link should be coloured
                    let linkIsActive = joins.includes(singleLink.join("--"))
                        || joins.includes(singleLink.reverse().join("--"));

                    const isHHContact = HHs.includes(`${x}-${y}`);

                    tds.push(
                        <div key={"" + x + "-" + y}
                             className={`td aa-link ${orientationClass}`}>
                            <div className={`link ${linkIsActive ? "active" : ""} ${isHHContact ? "hh-bond" : "" }`}/>
                        </div>
                    );
                } else {
                    tds.push(<div key={"" + x + "-" + y}
                                  className="td empty"/>);
                }
                return tds;
            });
        };

        for (let y = 0; y < gridSize * 2 - 1; y++) {
            result.push(
                <div key={"row" + y} className={["tr", y % 2 !== 0 ? "short" : ""].join(" ")}>
                    {tdFactory(y, gridSize)}
                </div>
            );
        }
        return result;
    }

    render() {
        let normalCellLen = 35;
        let smallCellLen = 15;
        let dynamicStyle = {
            minWidth: this.state.grid.length * (normalCellLen + smallCellLen) - smallCellLen,
            "--normal-cell-len": normalCellLen + "px",
            "--small-cell-len": smallCellLen + "px"
        };

        return <div id="board-wrapper" style={dynamicStyle}>
            <Options resetCallback={this.resetConfig}
                     changeAminoStringCallback={this.resetConfig}
                     aminoConfigs={aminoConfigs}/>
            {this.createGrid(this.state.gridSize)}
            <div id="scorebox">
                Current energy score: {this.state.score > 0 ? -this.state.score : this.state.score}
                <br/>
                <span>Maximum energy score: {this.state.optimalScore}</span>
            </div>
        </div>;
    }
}

FoldingBoard.propTypes = {
    // aminoString: PropTypes.string.isRequired
};


class AminoAcidCell extends Component {
    render() {
        let onClickCallBack = this.props.foldingIndicatorDirection ? () => this.props.indicatorClickCallback(this.props.foldingIndicatorDirection)
            : !this.props.hp ? this.props.aminoClickCallback /*resetToNormalState here*/ : () => null;
        return (
            <div
                className={["td", "aa-cell", this.props.isActive ? "active" : "", this.props.isRotationOrigin ? "active2" : "", this.props.foldingIndicatorDirection ? "folding-indicator" : ""].join(" ")}
                onClick={onClickCallBack}>
                {this.props.hp ?
                    <AminoAcid hp={this.props.hp} coords={this.props.coords}
                               aminoClickCallback={() => this.props.aminoClickCallback(this.props.coords)}/>
                    : ''}
            </div>
        );
    }
}

AminoAcidCell.propTypes = {
    coords: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isRotationOrigin: PropTypes.bool.isRequired,
    hp: PropTypes.string,
    aminoClickCallback: PropTypes.func,
    indicatorClickCallback: PropTypes.func,
    foldingIndicatorDirection: PropTypes.number
};


class AminoAcid extends Component {
    render() {
        return (
            <div className={["aa", this.props.hp].join(" ")}
                 onClick={this.props.aminoClickCallback}>
            </div>
        );
    }
}

AminoAcid.propTypes = {
    hp: PropTypes.string.isRequired,
    aminoClickCallback: PropTypes.func.isRequired
};


class FoldingIndicator extends Component {
    render() {
        return (
            <div className="folding-indicator"
                 onClick={this.props.indicatorClickCallback}/>
        );
    }
}

FoldingIndicator.propTypes = {
    indicatorClickCallback: PropTypes.func.isRequired
};


export default FoldingBoard
