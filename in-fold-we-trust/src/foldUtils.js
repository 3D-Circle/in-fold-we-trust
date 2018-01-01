
const aminos = "HPHHPPPH";
const testCoords = new Map([["1-1", "H"], ["1-2", "P"], ["2-2", "H"], ["2-3", "H"]]);

/* --- Utility functions --- */
const empty2dArray = (n) =>
      Array(n).fill().map(()=>Array(n).fill()); // to avoid the [None] * x syndrome

const cutArray = (arr, n, d) => // if d is 1 we include the nth element in the first list
      [arr.slice(0, n + d), arr.slice(n + d)];

/* vector stuff */
const vectorFromPoints = (from, to) =>
      [to[0] - from[0], to[1] - from[1]];

const compareArrays = (a1, a2) =>
      (a1.length === a2.length) && a1.every((v, i) => v === a2[i]);

const vectorWheel = [[1, 0], [0, -1], [-1, 0], [0, 1]];
const vectorWheelPos = (v) =>
      vectorWheel.findIndex((x) => compareArrays(x, v));

const applyVectorToPoint = (p, v) =>
      [p[0] + v[0], p[1] + v[1]];



function configFromSequence(seq, random=false) {
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


function gridFromCoordMap(aminoCoordMap) {
    // this will blindly follow the coordinates specified in the obj
    let grid = empty2dArray(aminoCoordMap.size);
    for (let aa of aminoCoordMap.keys) {
	let coords = ("" + aa).split(""); // TODO replace by lists instead of string
	grid[coords[0]][coords[1]] = aminoCoordMap.get(aa);
    }
    return grid;
}


// console.log(gridFromCoordObj(testCoords));

function linkLocationGen(aminoCoordMap) {
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
	// ok so this is bordel.
	// new-/old- prefix to show transformation/or not
	// new is the amino that is iterated through map
	// current- is the previous amino (not the one currently being iterated)
	// doesn't make sense but its better like this, because first current
	// is not in aminosToRotate (its the aaRotationPoint)

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
	// calculate new vector from rotate (TODO support more than pi/2 for rotation (not really necessary))
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
    console.log(newVectors);

    let currentPoint = aaRotationPoint.split("-").map((x) => parseInt(x, 10));
    let newAminoChain = new Map();
    let newPoint;
    let rotationPossible = true;
    newVectors.forEach(([vector, aaNature]) => {
	newPoint = applyVectorToPoint(currentPoint, vector);
	newAminoChain.set(newPoint.join("-"), aaNature);
	currentPoint = newPoint;
	// checks if the new point is inside the grid
	let outOfBounds = newPoint.findIndex((x) => x < 0 || x >= gridSize) > -1;
	if ((aminoCoordMap.get(newPoint.join("-")) !== undefined) || outOfBounds)  {
	    rotationPossible = false;
	    // TODO could we immediately break here ?
	}
    });

    let fullAminoChain;
    console.log(aminoCoordMap);
    if (rotationPossible) {
	// convert these back to a Map
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
	return fullAminoChain;
    } else {
	console.log("Rotation impossible !");
	return undefined;
    }
}

console.log(findPossibleRotation(testCoords, "1-1", "1-2", 1, 10));


export {
    // const
    aminos,
    // funcs
    configFromSequence,
    linkLocationGen
};
