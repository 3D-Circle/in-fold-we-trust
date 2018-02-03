import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalTemplate from "./modal";
// images
import startImg from './img/tutorial/start.png';
import contactHH from './img/tutorial/HH-contact.png';
import chainInitial from './img/tutorial/chain-initial.png';
import chainFolded from './img/tutorial/chain-folded-HH.png';
import chainFolding from './img/tutorial/chain-folding.png';
import step1_1 from './img/tutorial/step1-1.png';
import step2_2 from './img/tutorial/step1-2.png';
import foldSuccess from './img/tutorial/fold-success.gif';
import foldFail1 from './img/tutorial/fold-fail1.gif';
import foldFail2 from './img/tutorial/fold-fail2.gif';



class Tutorial extends Component {
    render() {
        if (this.props.language === 'EN') {
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
                To do so, you will need two folds. When you do a fold, you can only “break” the chain at one point, like
                this:
                <br/>
                <img src={chainFolding} alt="Folding the chain to create the H-H contact"/>
                <br/>
                <br/>

                Doing this fold (or any fold) requires three steps.
                <br/>
                These might seem a lot just to fold a chain, but after doing a few of them I promise it will become
                intuitive ;)
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
        } else if (this.props.language === 'CN') {
            return <ModalTemplate title="Tutorial" closingCallback={this.props.closingCallback}>
                第一次进入游戏时是不是会有些摸不着头脑呢? 不用担心，我们先从游戏界面讲起。
                <br/>
                <img src={startImg} alt="Start position"/>
                <br/>
                方格板上有两种不同颜色的圆球，每个圆球都被至少另一个圆球连着，这条东西就是你们需要折叠的氨基酸链！
                <br/>
                我们不会在教学里解释这个小游戏后的数学/科学大道理，所以看完教学后别忘了去看看解释哦！
                <br/>
                <br/>
                游戏目标很简单，玩家需要通过折叠来创造最多的 H-H 键。
                <br/>
                如你在解释页中会读到，H 是 Hydrophobic 疏水的简称，在游戏中就是红色的圆球。
                <br/>
                你可以这样组成一个 H-H 键:
                <br/>
                <img src={contactHH} alt="H-H contact"/>
                <br/>
                看到那条黑色的虚线了吗? 那就是你所折出的一个 H-H 键！
                <br/>
                每当两个在氨基酸链中不相邻的红色圆球被折叠到相邻的位置时，就会组成一个 H-H 键。
                <br/>
                <br/>

                为了成键，我们需要折叠氨基酸链。假设我们要将这条氨基酸链
                <br/>
                <img src={chainInitial} alt="Initial chain"/>
                <br/>
                折成这样从而组成一个 H-H 键:
                <br/>
                <img src={chainFolded} alt="Folded chain with 1 H-H contact"/>
                <br/>
                我们需要两次折叠。当你进行折叠时，需要将氨基酸链"劈"成两半：
                To do so, you will need two folds. When you do a fold, you can only “break” the chain at one point, like
                this:
                <br/>
                <img src={chainFolding} alt="Folding the chain to create the H-H contact"/>
                <br/>
                <br/>

                一次折叠需要三步操作
                <br/>
                <br/>

                <em>Step 1</em> - 选择原点 (origin) 以及旋转中心 (rotation point，必须在链中与原点相邻)
                <br/>
                比如，你想移动左边的三个氨基酸:
                <br/>
                <img src={step1_1} alt="Moving the three amino acids on the left"/>
                <br/>
                或者想移动最右边的一个氨基酸:
                <br/>
                <img src={step2_2} alt="Moving the last amino acid on the right"/>
                <br/>
                <br/>

                <em>Step 2</em> - 选完这两个点后，你可以点击一个蓝色的方块而进行折叠
                <br/>
                蓝色的方块只有在你可以往那个方向旋转时才会显示。比如:
                <br/>
                <img src={foldSuccess} alt="Folding the three amino acids on the left down"/>
                <br/>
                <br/>

                <strong>注意</strong> - 当你的折叠将氨基酸链的一部分折出方格板时不会有蓝色的方块显示：
                <br/>
                <img src={foldFail1} alt="Folding failed because the fold goes outside the grid"/>
                <br/>
                当你的折叠将氨基酸链的一部分折到它自己身上时蓝色的方块也不会显示:
                <br/>
                <img src={foldFail2} alt="Folding failed because the fold collapses with existing amino acids"/>
                <br/>
                <br/>

                以上就是游戏的全部规则了。祝好运!
                <br/>
                (最后，如果对游戏背后的数学、科学知识看兴趣，千万别忘了查看 Explanation 解释页)
            </ModalTemplate>
        }
    }
}

Tutorial.propTypes = {
    closingCallback: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
};

export default Tutorial
