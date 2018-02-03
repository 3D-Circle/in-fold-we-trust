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
        if (this.props.language === 'EN') {
            return <ModalTemplate title={"Explanation"} closingCallback={this.props.closingCallback}>
                Hello and welcome to our <a href="http://ejm.chinathinksbig.org/">CTB project</a>!
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
                Don’t be fooled by the messy appearance: these molecules fold themselves following extremely complex
                rules,
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
                        aminos on the grid; however proteins don’t fold with 90° angles all the time like in the game.
                    </li>
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
                In our case, when it comes to actually solving the problem, mathematicians have called computer
                scientists
                to attempt and create programs that would find this configuration. Sadly, many HP models have been
                proved
                to be <span className="bold">NP hard</span>. If a problem is <span className="bold">NP hard</span>,
                that means that there is no polynomial time algorithm to solve this problem - in other words, it would
                take even the most powerful of computers a very very long time to find the folding as the length of the
                chain increases. Even the simplest lattice model, the one you can interact with in our game,
                has been proved to be NP-hard.
                <br/><br/>
                So, don’t be fooled by appearances! While this may seem like an easy game, or at least just a game,
                its solution cannot be found efficiently by computers. And this is only a very small part of the
                problem:
                remember, there are many other forces acting upon the proteins, and our models aren’t even close to
                modelling the real-life conditions that these proteins fold in.
                <br/><br/>
                We hope that after reading this, you have a better on grasp on the extreme complexity of the
                protein folding problem. Happy folding !
                <br/><br/><br/>
                PS: If you're interested and want to read more, most of our material for this explanation comes from <a
                href="http://math.mit.edu/classes/18.417/Slides/protein-prediction.pdf">this excellent MIT
                presentation</a> on
                the matter. Also, make sure to check out <a
                href="http://courses.csail.mit.edu/6.849/spring17/lectures/L20.html">this class</a>.
            </ModalTemplate>
        } else if (this.props.language === 'CN') {
            return <ModalTemplate title={"Explanation"} closingCallback={this.props.closingCallback}>
                欢迎来到 <a href="http://ejm.chinathinksbig.org/">我队 CTB 项目网站</a> 的解答区！
                <br/><br/>
                各位玩家和评委们有没有在我们的小游戏中取得好的成绩呢？如果有，恭喜你们！如果没有，不要泄气，你们可以做到的！Try Again!
                <br/>
                好了，玩耍过后就该进入主要的话题了。
                大家在玩的时候有没有觉得很奇怪，为什么 3D-Circle 这个奇葩名字的小队搞了个这么奇葩的游戏，再次恭喜你，来对了地方！
                现在我们会在下文中为大家解释我们创造此游戏的初衷，并且解答生物学与折纸的相似性！
                <br/>
                话说回来好像是没啥关系哎……嗨，大家往下看就懂了！
                <br/><br/>
                就像我们在 Tutorial 里面所提到的，游戏里两种颜色的圆球代表着一串氨基酸，而大家经常听到的蛋白质就是这些氨基酸所组成的。
                在座的各位应该都上过生物课吧，如果课上不走神不睡觉不挂科 (不排除好好听课却啥也没懂的好童鞋) 的话肯定知道关于氨基酸
                和蛋白质的一些基本知识：它们最主要的目的是保持我们人体的正常运作。蛋白质刚刚成型时差不多长这个样子：

                <img src={proteinPrimary} alt="Protein Primary structure"/>
                这个长长一链都是氨基酸，右下角的放大图中介绍了每个氨基酸大概的基本结构，生物学中还有20种不同结构氨基酸，
                比如说Phe，Leu，Ser，Cys等等。到这就已经找不到北的同学不用担心，即使这些氨基酸很有趣，
                我们 Project 的目的不是为大家列出每一个氨基酸，所以当下把它们当成一个整体就好了，不必把事情搞得太复杂，
                毕竟在此项目里我们几个从事算机科学、数学的也不想跳槽去搞生物、化学。
                <br/><br/>
                废话不多讲，现在就让我们回归正题。蛋白质这个东西呢，在现实生活中差不多应该长这个样子：
                <img src={proteinFolded} alt="Folded Protein"/>
                额额额……说好的简单易懂的一条直线哪去了？
                <br/>
                还记得大家刚刚玩过的页面游戏吗？玩家们在那些圆圈上那些戳戳转转造就了蛋白质的这种复杂的结构！
                通过折叠，一条氨基酸链会通过折叠组成各种 H-H 键以便稳定其结构，从而呈现出上图蛋白质的样子。
                <br/><br/>
                千万别以为大自然脑洞大开然后瞎折一气后丢给我们个乱七八糟的氨基酸链。你们系鞋带能系多复杂，还不是有规定的扎法？
                每一个蛋白质里的分子也是一样。它们折叠的方法异常复杂，并且可在区区几秒之内完成折叠。
                这还不是最让人吃惊的，这些分子可以组成的组合的数量级在10的95次方左右，而蛋白质所使用的总是链接最完美的那一个。
                在这么小的东西身上，这些折叠是怎么达到又快又好的的地步的呢？
                <br/><br/>
                这就是我们小队需要解答的问题，一个生物学的未答难题：我们怎么样才可以通过一串简单的氨基酸来判断蛋白质里分子的折叠方法？
                从理论上来讲，蛋白质折叠的过程由所给的氨基酸来决定。
                举个例子，如果你从原本的氨基酸链里移除一个氨基酸，最后得到的蛋白质就会和原本的蛋白质有本质上的区别。
                <br/><br/>
                想要了解蛋白质的折法，大家需要先知道驱动蛋白质折叠的一些规则。
                蛋白质折叠的驱动力有很多，如果有兴趣可以戳一下
                <a href="https://en.wikipedia.org/wiki/Protein_folding#Driving_force_of_protein_folding">链接</a>。
                但我们小队将会研究其中一种：疏水-极性模型。
                <br/><br/>
                在我们的小游戏里，大家应该注意到了两种不同颜色的圆球，有红的，也有蓝的。
                蓝色代表亲水/极性胺，红色代表疏水胺。
                在我们的身体里，蛋白质其实一直在体液里；但是就像刚刚提到的，有些胺不可碰水，而其它的却可以。
                这就意味着蛋白质在折叠的时候，这些由红色圆球代表的疏水胺一定不会与水分子接触，蓝色的极性胺就必须处在与体液接触的第一线。
                <br/><br/>
                所以长话短说，大家之前玩的小游戏里也包含了这个道理：
                为了取得最多的红色链接，玩家需要通过把蓝色圆球置于外围来把红色圆球尽可能的结合。
                玩家最后得分也是如此计算：疏水胺相连(H-H 键)越多，说明它们的组合越大，也就代表它们不会处于外围。
                <br/><br/>
                现在大家应该了解我们小组小游戏的目的了吧！我们通过把生物学上的一个难题简单化，让大众可以更好的去理解难题背后的基础知识。
                当然，在我们之前已经有很多人尝试去解答这些难题了：数不清的专业生物学家、化学家、数学家和计算机科学家。
                <br/>
                我们游戏中使用了如同国际象棋中的<span className="bold">平面正方形网格</span>来放置氨基酸。
                这种表示方式和真正的蛋白质还相差不少：
                <ul>
                    <li><span className="bold">维度</span>: 我们的小游戏是平面的，但是蛋白质却是立体的。</li>
                    <li><span className="bold">模型</span>: 我们用方块格子来表示结构，现实中的氨基酸的旋转角度远比90度直角复杂。
                    </li>
                </ul>

                其实蛋白质的模型还可以用其他的方式来表示：
                <ul>
                    <li>抛开<span className="bold">方形网格</span>, 三角形网格同样也可以用来模拟蛋白质结构：
                        <img src={latticeTriangular} alt="Triangular lattice"/>
                    </li>
                    <li>
                        抛开平面网格、走入立体晶格也很有意思：
                        <ul>
                            <li>
                                简单的立方晶格 (cubic)：<br/>
                                <img src={latticeCubic} alt="Cubic lattice"/>
                            </li>
                            <li>
                                体心立方晶格 (body-centered cubic / BCC)：<br/>
                                <img src={latticeBcc} alt="BCC lattice"/>
                            </li>
                            <li>
                                面心立方晶格 (face-centered cubic / FCC)：<br/>
                                <img src={latticeFcc} alt="FCC lattice"/>
                            </li>
                        </ul>
                    </li>
                </ul>
                大家应该看出来了，这些网格模型从简到繁：尤其是最后一个面心立方晶格，光是顶点和角度就多出了很多。
                <img src={modelTangent} alt="Tangent Spheres"/>
                更有甚者，用球体模型解决了现实生活中没有网格/晶格的问题：我们可以随意转动氨基酸，只需保证两个代表氨基酸的球体互切。
                这些模型越是复杂，就越接近现实。下表是使用各种模型预测蛋白质折叠的误差，数值越小说明准确率越高：
                <img src={modelAccuracy} alt="Model accuracy"/>

                所以说，大家千万不要被外表蒙惑了双眼！即便我们的游戏看起来很简单，事实上它的答案并不可能被电脑有效的找出！别忘了，我们的游戏所体现的折叠蛋白质领域有限，在蛋白质里肯定还有很多其他的力在施压，我们游戏中的模型离现实差的还不少呢！

                我们小组成员杨竞颉，陈亦珩，和 Theo 希望我们的小游戏和这篇解答文章让大家更好的了解了关于蛋白质折叠的难题。在我们现在的世界里，计算机的水平并不足够为我们解答蛋白质里千变万化的折叠方法。我们小组成员以后会继续努力，争取以后可以让这些难题迎刃而解！中国大智慧，我们来了！

                从表格可以看出面心立方晶格模型最接近现实，或许因为在立方体模型中数它最复杂。
                基于数据，我们似乎可以得"一个出模型的准确性与其复杂形成正比"的结论。
                但是当模型变得越复杂，操作起来也就越麻烦。
                这是在应用数学中很重要：构建模型时，一定要确保其准确性；
                但也要保证模型不能太复杂，不然结果不仅难以捉摸又容易出错。
                <br/><br/>
                为了解决蛋白质折叠的难题，数学家请来了计算机科学家们的支援，希望他们能写出能预测蛋白质结构的程序。
                不幸的是，各种疏水-极性模型被证明为 <span className="bold">NP 困难</span>。
                <span className="bold">NP 困难</span>的意思是不存能在多项式时间内解决问题的算法——换言之，即使是最快的电脑也要用极其
                长的时间才能找到最优的折叠，特别当氨基酸链的长度很长时。
                就连刚刚你在小游戏里看到的那个模型被证明为 NP 困难的。
                <br/><br/>
                所以说，大家千万不要被外表蒙惑了双眼！即便我们的游戏看起来很简单，事实上要找出最佳的答案很难，连电脑都不能胜任！
                别忘了，我们的游戏所体现的折叠蛋白质领域有限：在蛋白质里肯定还有很多其他的力在施压，我们游戏中的模型离现实差的还不少呢！
                <br/><br/>
                我队希望我们的小游戏和这篇解答文章让大家能对蛋白质折叠这一为解难题有跟好的了解。
                当下，我们各个领域的知识还不足以让人类理解千变万化的蛋白质折叠；
                但我们小组成员以后会继续努力，争取通过像这种小游戏的形式让更多人了解并参与此领域，让这些难题迎刃而解！
                中国大智慧，我们来了！
                <br/><br/><br/>
                PS: 对于学有余力者，这篇文章中许多资料取自
                <a href="http://math.mit.edu/classes/18.417/Slides/protein-prediction.pdf"> MIT 的课纲</a>
                以及<a href="http://courses.csail.mit.edu/6.849/spring17/lectures/L20.html">此课程</a>。
            </ModalTemplate>
        }
    }
}

Explanation.propTypes = {
    closingCallback: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
};

export default Explanation
