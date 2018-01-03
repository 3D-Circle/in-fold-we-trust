/*
  Functions to calculate folding stuff
*/


const aminos = "HPHHPPPH";


const empty2dArray = (n) =>
    Array(n).fill(undefined).map(() => Array(n).fill(undefined)); // to avoid the [None] * x syndrome

const cutArray = (arr, n, d) => // if d is 1 we include the nth element in the first list, else in second list
    [arr.slice(0, n + d), arr.slice(n + d)];  // returns two arrays

const compareArrays = (a1, a2) =>
    (a1.length === a2.length) && a1.every((v, i) => v === a2[i]);

const findMapNeighbours = (m, keyToFind) => {  // this doesn't work for nested lists /!\
    let mapArray = Array.from(m.keys());
    let found = mapArray.indexOf(keyToFind);
    return [
        found > 0 ? mapArray[found - 1] : undefined,
        found < m.size - 1 ? mapArray[found + 1] : undefined
    ]
};

/* vector stuff */
const vectorFromPoints = (from, to) =>
    [to[0] - from[0], to[1] - from[1]];

// this is for determining the new vector from a vector and a rotation
const vectorWheel = [[1, 0], [0, -1], [-1, 0], [0, 1]];
const vectorWheelPos = (v) =>
    vectorWheel.findIndex((x) => compareArrays(x, v));

const applyVectorToPoint = (p, v) =>
    [p[0] + v[0], p[1] + v[1]];


function configFromSequence(seq, random = false) {
    // creates a flat or random grid and coordMap from a string seqence
    let grid = empty2dArray(seq.length + 2);
    let aminoCoordMap = new Map();
    let middle = Math.floor(seq.length / 2);

    if (random) {
        // let currentX = middle;
        // let currentY = middle;
        // let increments = [0, 1];
        // for (let c of seq.split("")) {
        // TODO
        // }
    } else {
        seq.split("").forEach((element, x) => {
            grid[x + 1][middle] = element;
            aminoCoordMap.set([(x + 1), middle].join("-"), element);
        }); // its raising warning about not returning anything, should we care ?
    }
    return [aminoCoordMap, grid];
}


function gridFromCoordMap(aminoCoordMap, gridSize) {
    // create a grid from a coordMap
    let grid = empty2dArray(gridSize);
    for (let aa of aminoCoordMap.keys()) {
        let coords = aa.split("-");
        grid[coords[0]][coords[1]] = aminoCoordMap.get(aa);
    }
    return grid;
}


function linkLocationGen(aminoCoordMap) {
    // creates a list of links from an aminoCoordMap
    // this is possible because Maps are ordered
    // returns: list of coords of each link
    let result = [];
    let allCoords = Array.from(aminoCoordMap.keys());
    allCoords.forEach((key, index) => {
        if (index !== allCoords.length - 1) {
            result.push([key, allCoords[index + 1]].join("--"));  // TODO when changing strings change this
        }
    });
    return result;
}


function getFoldingIndicators(_aaOrigin, _aaRotationPoint, gridSize, directionValidity) {
    // TODO optimize in terms in space
    // this returns the folding indicator Map
    // structure: { coords -> -1 || +1 }
    // direction validity is a map with +1 || -1 --> something not undefined || undefined
    let aaOrigin = _aaOrigin.split("-").map((x) => parseInt(x, 10));
    let aaRotationPoint = _aaRotationPoint.split("-").map((x) => parseInt(x, 10));
    let foldingIndicatorCoords = new Map();
    let direction;
    console.log("DIRECTION VALIDITY");
    console.log(directionValidity);
    if (aaOrigin[0] === aaRotationPoint[0]) {
        if (aaRotationPoint[0] + 1 < gridSize) {
            direction = aaOrigin[1] < aaRotationPoint[1] ? -1 : 1;
            if (directionValidity.get(direction) !== undefined) {
                foldingIndicatorCoords.set(
                    (aaRotationPoint[0] + 1) + "-" + aaRotationPoint[1], direction
                );
            }
        }
        if (aaRotationPoint[0] - 1 >= 0) {
            direction = aaOrigin[1] < aaRotationPoint[1] ? 1 : -1;
            if (directionValidity.get(direction) !== undefined) {
                foldingIndicatorCoords.set(
                    (aaRotationPoint[0] - 1) + "-" + aaRotationPoint[1], direction
                );
            }
        }
    } else if (aaOrigin[1] === aaRotationPoint[1]) {
        if (aaRotationPoint[1] + 1 < gridSize) {
            direction = aaOrigin[0] < aaRotationPoint[0] ? 1 : -1;
            if (directionValidity.get(direction) !== undefined) {
                foldingIndicatorCoords.set(
                    aaRotationPoint[0] + "-" + (aaRotationPoint[1] + 1), direction
                );
            }
        }
        if (aaRotationPoint[1] - 1 >= 0) {
            direction = aaOrigin[0] < aaRotationPoint[0] ? -1 : 1;
            if (directionValidity.get(direction) !== undefined) {
                foldingIndicatorCoords.set(
                    aaRotationPoint[0] + "-" + (aaRotationPoint[1] - 1), direction
                );
            }
        }
    }
    return foldingIndicatorCoords;
}


function findPossibleRotation(aminoCoordMap, aaOrigin, aaRotationPoint, direction, gridSize) {
    // calculating the possible rotation of the chain depending on selected aa
    // direction is either 1 (anti-clockwise) or -1 (clockwise) (sens trigonometrique)
    // Find which part to move
    let allAminos = Array.from(aminoCoordMap.keys());
    let aminosToRotate;
    let leftOverAminos;
    let traverseDirection;  // taking the end of the chain vs the beginning
    if (allAminos.indexOf(aaOrigin) < allAminos.indexOf(aaRotationPoint)) {
        // origin is included in rotations
        [aminosToRotate, leftOverAminos] = cutArray(allAminos, allAminos.indexOf(aaOrigin), 1);
        aminosToRotate.reverse(); // reverse because we want first element to be origin
        traverseDirection = -1;
    } else {
        [leftOverAminos, aminosToRotate] = cutArray(allAminos, allAminos.indexOf(aaOrigin), 0);  // origin switches sides
        traverseDirection = 1;
    }

    // calculation + tranformation of all the vectors
    let newVectors = [];
    aminosToRotate.forEach((nextAmino, index) => {
        // ok so this is naming un peu bordel
        // new-/old- prefix to show transformation/or not
        // new is the amino that is iterated through map
        // current- is the previous amino (not the one currently being iterated)
        // doesn't make sense but its better like this, because first currentAmino
        // is not in aminosToRotate (its the aaRotationPoint)

        // so we have two coords, currentAmino and nextAmino
        // we find the vector from current to next
        // we tranform this vector according to the folding / rotation we have
        // we add the new vector to the list

        // current coords
        let oldCurrentAminoCoords;
        if (index === 0) {
            oldCurrentAminoCoords = aaRotationPoint;
        } else {
            oldCurrentAminoCoords = aminosToRotate[index - 1];
        }
        oldCurrentAminoCoords = oldCurrentAminoCoords.split("-").map((x) => parseInt(x, 10));
        // next coords
        let oldNextAminoCoords = nextAmino.split("-").map((x) => parseInt(x, 10));

        // old vector
        let oldVectorToNext = vectorFromPoints(oldCurrentAminoCoords, oldNextAminoCoords);
        // calculate new vector from rotate
        let p = vectorWheelPos(oldVectorToNext);
        let newVectorToNext;
        if (p === 0 && direction === -1) {
            newVectorToNext = vectorWheel[3];
        } else if (p === 3 && direction === 1) {
            newVectorToNext = vectorWheel[0];
        } else {
            newVectorToNext = vectorWheel[p + direction];
        }
        newVectors.push([newVectorToNext, aminoCoordMap.get(nextAmino)]);
    });

    // we then apply each of the *new* vectors in the list to the starting point
    // which will give us the structure of the amino chain *after* folding
    let currentPoint = aaRotationPoint.split("-").map((x) => parseInt(x, 10));
    let newAminoChain = new Map();
    let newPoint;
    let rotationPossible = true;
    newVectors.forEach(([vector, aaNature]) => {
        newPoint = applyVectorToPoint(currentPoint, vector);
        newAminoChain.set(newPoint.join("-"), aaNature);
        currentPoint = newPoint;
        // checks if the new point is inside the grid
        let outOfBounds = newPoint.findIndex(
            (x) => x < 0 || x >= gridSize
        ) > -1;
        if (outOfBounds) {
            console.log("this thing is out of bounds !");
        }
        if ((aminoCoordMap.get(newPoint.join("-")) !== undefined) || outOfBounds) {
            // one conflict = rotation impossible
            rotationPossible = false;
        }
    });

    let fullAminoChain;
    if (rotationPossible) {
        // convert this coordList back to a aminoCoordMap
        let leftOverAminosMap = new Map();
        leftOverAminos.forEach((c) => {
            leftOverAminosMap.set(c, aminoCoordMap.get(c));
        });
        if (traverseDirection === -1) {
            // reverse + stick the new ones at the start
            fullAminoChain = new Map([...Array.from(newAminoChain.entries()).reverse(), ...leftOverAminosMap]);
        } else if (traverseDirection === 1) {
            // stick the new ones at the end
            fullAminoChain = new Map([...leftOverAminosMap, ...newAminoChain]);
        } else {
            throw new Error("THIS SHOULD NEVER HAPPEN");
        }
        console.log(fullAminoChain);
        return fullAminoChain;
    } else {
        console.log("Rotation impossible !");
        return undefined;
    }
}


export {
    // const
    aminos,
    // funcs
    configFromSequence,
    linkLocationGen,
    findPossibleRotation,
    getFoldingIndicators,
    gridFromCoordMap,
    findMapNeighbours
};
