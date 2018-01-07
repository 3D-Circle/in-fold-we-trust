import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalTemplate from "./modal";
import startImg from './img/start.png';
import contactHH from './img/HH-contact.png';
import chainInitial from './img/chain-initial.png';
import chainFolded from './img/chain-folded-HH.png';
import chainFolding from './img/chain-folding.png';
import step1_1 from './img/step1-1.png';
import step2_2 from './img/step1-2.png';
import foldSuccess from './img/fold-success.gif';
import foldFail1 from './img/fold-fail1.gif';
import foldFail2 from './img/fold-fail2.gif';


class Tutorial extends Component {
    render() {
        return <ModalTemplate title="Tutorial" closingCallback={this.props.closingCallback}>
            This is what you’ll start with:
            <br/>
            <img src={startImg} alt="Start position"/>
            <br/>
            This is a chain of amino acids (the coloured circles).
            <br/>
            We won’t explain much of the scientific / mathematical background here,
            so as soon as you finish this tutorial, be sure to check out the explanations.
            <br/>
            <br/>

            The goal of the game is to make as many H-H bonds as you can.
            <br/>
            As you’ll see in the explanation, H stands for hydrophilic, and these are the red ones.
            <br/>
            A bond is created like this:
            <br/>
            <img src={contactHH} alt="H-H contact"/>
            <br/>
            Notice the dotted black line ? That’s an H-H bond.
            <br/>
            These bonds can only be created between two red amino acids that aren’t next to each other in the chain.
            <br/>
            <br/>

            To make these bonds, you’ll have to fold this chain. Let’s say we want to fold this chain
            <br/>
            <img src={chainInitial} alt="Initial chain"/>
            <br/>
            Into this chain, to create one H-H bond:
            <br/>
            <img src={chainFolded} alt="Folded chain with 1 H-H contact"/>
            <br/>
            To do so, you will need two folds. When you do a fold, you can only “break” the chain at one point, like this:
            <br/>
            <img src={chainFolding} alt="Folding the chain to create the H-H contact"/>
            <br/>
            <br/>

            Doing this fold (or any fold) requires three steps.
            <br/>
            These might seem a lot just to fold a chain, but after doing a few of them I promise it will become intuitive ;)
            <br/>
            <br/>

            <em>Step 1</em> - Select first an origin and then a rotation point (next to the origin)
            <br/>
            For example, if you want to move the three amino acids on the left:
            <br/>
            <img src={step1_1} alt="Moving the three amino acids on the left"/>
            <br/>
            Or if you want to move the last amino acid on the right:
            <br/>
            <img src={step2_2} alt="Moving the last amino acid on the right"/>
            <br/>
            <br/>

            <em>Step 2</em> - After you’ve selected these two points, you can click on a blue square to rotate.
            <br/>
            These blue square will show up if you can rotate in that direction. Example:
            <br/>
            <img src={foldSuccess} alt="Folding the three amino acids on the left down"/>
            <br/>
            <br/>

            <strong>Note</strong> - blue squares do not appear if your fold goes outside the grid:
            <br/>
            <img src={foldFail1} alt="Folding failed because the fold goes outside the grid"/>
            <br/>
            They don't appear either if your fold collapses with existing amino acids:
            <br/>
            <img src={foldFail2} alt="Folding failed because the fold collapses with existing amino acids"/>
            <br/>
            <br/>

            And that's it for how the game works. Have fun!
            <br/>
            (And remember to check out the explanation to see the mathematics / science behind this simple game)
        </ModalTemplate>
    }
}

Tutorial.propTypes = {
    closingCallback: PropTypes.func.isRequired
};

export default Tutorial
