// Detect arrays, e.g. c[0]
const arrayRegex = /\[(\d)\]/;

// This function takes a path and an object that needs to be traversed, and returns the value
const traverse = (pathString, objectToTraverse) => {
	let path = splitPathIntoParts(pathString);

	let lastHit = objectToTraverse;
	let value = undefined;

	path.forEach((p, index) => {
		let val;
		try {
			val = lastHit[p];
		} catch (e) {
			return undefined;
		}

		if(typeof val !== undefined)
		{
			lastHit = val;
		}
		else
		{
			return undefined;
		}

		if(index === path.length - 1)
		{
			value = lastHit;
		}
	});

	return value;
};

const mutate = (pathString, objectToTraverse, callback) => {
	const path = splitPathIntoParts(pathString);
	const oldValue = traverse(pathString, objectToTraverse);
	const newValue = callback(oldValue);

	const objectCopy = Object.assign({}, objectToTraverse);

	let lastHit = objectCopy;

	if(path.length === 1) {
		objectCopy[path[0]] = newValue;
		return objectCopy;
	}

	path.forEach((p, index) => {
		if(index === path.length - 1) return;

		if(lastHit[p]) {
			lastHit = lastHit[p];
			if(index === path.length - 2) {
				if(lastHit[path[index + 1]]) {
					lastHit[path[index + 1]] = newValue;
				}
			}	
		}
	});
	
	return objectCopy;
};

const splitStringByDots = string => string.split('.');

// Changes ['c[0]'] into ['c', 0]
const breakApartArrays = path => {
	// We shouldn't alter an array we're traversing.
	let newPath = [...path];

	// An offest to make sure we match the locations in the new array when we start adding entries
	let indexOffset = 0;

	path.forEach((p, index) => {

		// Is this an array? c[0] === true, c === false
		const match = p.match(arrayRegex);
		if(match)
		{
			// Replace c[0] with c
			newPath[index + indexOffset] = path[index].replace(arrayRegex, '');

			//Add '0' as a new key
			newPath.splice(index + 1 + indexOffset, 0, match[1]);

			// Increase the offset by 1
			indexOffset++;
		}
	});

	return newPath;
}

const splitPathIntoParts = (path) => {
	return breakApartArrays(splitStringByDots(path));
};

module.exports = { traverse, mutate, splitPathIntoParts };
