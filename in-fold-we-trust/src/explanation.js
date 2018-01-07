import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalTemplate from './modal';
// images
import proteinPrimary from './img/explanation/protein-primary.png';
import proteinFolded from './img/explanation/protein-folded.png';
import latticeTriangular from './img/explanation/lattice-triangular.png';
import latticeCubic from './img/explanation/lattice-cubic.png';
import latticeBcc from './img/explanation/lattice-bcc.png';
import latticeFcc from './img/explanation/lattice-fcc.png'
import modelTangent from './img/explanation/model-tangent.png';
import modelAccuracy from './img/explanation/model-accuracy.png';



class Explanation extends Component {
    render() {
        return <ModalTemplate title={"Explanation"} closingCallback={this.props.closingCallback}>
            Hello and welcome to our CTB project !
            <br/><br/>
            We hope you’ve been enjoying our game so far. If you haven’t tried it out yet,
            please check out the tutorial before you read the explanation. <br/>If you did, and are
            wondering why we made such a game, then read on.
            <br/><br/>
            As we mentioned in the tutorial, what is represented in our game is a chain of amino acids.
            A protein is made up of one or more chains of amino acids like these.
            If you ever attended any biology class, you probably learned about those molecules,
            whose job is key to make the human body function. When proteins are made, they look like this:
            <img src={proteinPrimary} alt="Protein Primary structure"/>
            They’re a chain of amino acids, which is the molecule you can see in the lower right corner.
            There are 20 types of them: each type is represented with three letter (Phe, Leu, Ser, Cys, etc).
            Don’t worry about their chemical composition; although they’re very interesting to study,
            we’re only going to consider them as a single entity, because we’re more mathematicians and
            computer scientists than biologists or chemists ;).
            <br/><br/>
            Going back to those proteins, when you observe them in real life, they look more like this:
            <img src={proteinFolded} alt="Folded Protein"/>
            How do they pass from being a simple chain, to a complex shape ?
            Well, they go through the operation of folding, which you were the one doing while playing this game.
            <br/><br/>
            Don’t be fooled by the messy appearance: these molecules fold themselves following extremely complex rules,
            and in a matter of seconds. What’s even more impressive, is that it was calculated that the number of
            possible configurations’ order of magnitude is around 10^95 (for a very simplified model),
            while it is believed that the configuration that the protein folds into is always the best:
            how can these molecules do it so fast and so well ?
            <br/><br/>
            Now, we have come to the central problem, the most important unsolved problem in biochemistry today:
            how can you, from a simple chain of amino acids, predict how the molecule will fold ?
            It is supposed that the whole folding process is determined only by the chain of amino acids:
            for example, if you change one amino acid in a chain, the resulting protein will not fold in
            the same way as the previous one.
            <br/><br/>
            To know how the protein will fold, you first have to know which rules this folding obeys.
            There are many (have a look
            <a href="https://en.wikipedia.org/wiki/Protein_folding#Driving_force_of_protein_folding">here</a>
            if you’re interested) but in our project we will only study one: the Hydrophobic-Polar model.
            <br/><br/>
            In our game, you have noticed that some of the aminos are red, while the rest are blue.
            Blue is for polar, and red is for hydrophobic - which means afraid of water.
            In our body, proteins are always in water: however, some of their amino acids must not be in
            contact with the water, while others can. This means that when the protein folds,
            the ones that must not touch the water - the hydrophobic ones (red) - must stay in the inside,
            while the others can go in the outside.
            <br/><br/>
            Well, that’s exactly what you’re doing in this game: you’re folding the protein so that as many of the
            red amino acids are inside, and as many of the blue ones are inside. We measure that by looking at how
            many of the hydrophobic amino acids are touching each other: if there is a bond, that means that they
            are grouped, and therefore not outside.
            <br/><br/>
            So here you go, we hope you now understand why playing this little game is in fact related to the
            greatest unsolved problem in biochemistry. Many have made attempts and progressed: biologists of course,
            but also mathematicians and computer scientists.<br/>
            What we have just explained to you is the informal version of what’s known as the
            <span className="bold">2D HP model in the
            square lattice</span>.
            <ul>
                <li><span className="bold">2D</span>: our game is in 2D, but proteins fold in 3D</li>
                <li><span className="bold">Square lattice</span>: you’ve noticed that you could only position the
                    aminos on the grid; however proteins don’t fold with 90° angles all the time like in the game.</li>
            </ul>

            There are many other models for the same problem:
            <ul>
                <li>Instead of a <span className="bold">square lattice</span>, you could use a triangular lattice,
                    like this one:
                    <img src={latticeTriangular} alt="Triangular lattice"/>
                </li>
                <li>
                    Things get more interesting and complicated when you go in 3D.
                    <ul>
                        <li>
                            You have the simple cubic lattice:<br/>
                            <img src={latticeCubic} alt="Cubic lattice"/>
                        </li>
                        <li>
                            The body centered cubic lattice:<br/>
                            <img src={latticeBcc} alt="BCC lattice"/>
                        </li>
                        <li>
                            And the face centered cubic lattice:<br/>
                            <img src={latticeFcc} alt="FCC lattice"/>
                        </li>
                    </ul>
                </li>
            </ul>
            These lattices are ranked by complexity: the most complex being the face centered cubic lattice,
            because there are many more vertices and angle configurations available.
            <img src={modelTangent} alt="Tangent Spheres"/>
            As you can imagine, this is much more lifelike: you are not constrained by a grid, and the amino acids
            can rotate freely, as long as their circle is tangent to another amino’s circle.
            As they get more complicated, these models get closer to the reality.
            Here are the results of a study done to compare these models in term of accuracy (lower is better):
            <img src={modelAccuracy} alt="Model accuracy"/>
            As you can see, the face-centered cubic lattice is the most precise, because it is the most complex one
            of the three. It appears that as a model grows more complex, it becomes more accurate.
            However, it also becomes harder to work with. This is an important component of applied mathematics:
            when you are constructing a model, you have to make it accurate, but also not too complex in order to be
            able to work with it.
            <br/><br/>
            In our case, when it comes to actually solving the problem, mathematicians have called computer scientists
            to attempt and create programs that would find this configuration. Sadly, many HP models have been proved
            to be <span className="bold">NP hard</span>. If a problem is <span className="bold">NP hard</span>,
            that means that there is no polynomial time algorithm to solve this problem - in other words, it would
            take even the most powerful of computers a very very long time to find the folding as the length of the
            chain increases. Even the simplest lattice model, the one you can interact with in our game,
            has been proved to be NP-hard.
            <br/><br/>
            So, don’t be fooled by appearances! While this may seem like an easy game, or at least just a game,
            its solution cannot be found efficiently by computers. And this is only a very small part of the problem:
            remember, there are many other forces acting upon the proteins, and our models aren’t even close to
            modelling the real-life conditions that these proteins fold in.
            <br/><br/>
            We hope that after reading this, you have a better on grasp on the extreme complexity of the
            protein folding problem. Happy folding !
            <br/><br/><br/>
            PS: If you're interested and want to read more, most of our material for this explanation comes from <a href="http://math.mit.edu/classes/18.417/Slides/protein-prediction.pdf">this excellent MIT presentation</a> on
            the matter. Also, make sure to check out <a href="http://courses.csail.mit.edu/6.849/spring17/lectures/L20.html">this class</a>.
        </ModalTemplate>
    }
}

Explanation.propTypes = {
    closingCallback: PropTypes.func.isRequired
};

export default Explanation
