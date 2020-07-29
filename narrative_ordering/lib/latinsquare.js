/**
 * Creates a random row generating function meeting the lating square restriction
 * usage:
 *		 sampler = latinCube(someRow)
 *		 newRow = sampler() | newRow = sampler(row)
 * @param	 {Array}		row samples to be randomized
 * @returns {Function} row generating function
 */
function latinSquare (row) {
	var sN = row.length,
			rowCount = 0

	var seed = 1;
	// prepare array of row and col indices for pre-sorting
	var hSort = shuffle_latin(sequence(sN), seed),
			vSort = shuffle_latin(hSort.slice(), seed)

	return function nextRow (countORtarget) {
		if (rowCount === sN) return countORtarget = null
		var target = Array.isArray(countORtarget) ? countORtarget
			: (countORtarget >= 0) ? Array(countORtarget)
			: Array(sN)
		if (target.length > sN) target.length = sN

		for (var i = 0; i < target.length; ++i) {
			var idx = hSort[i] + vSort[rowCount]
			if (idx >= sN) idx -= sN
			target[i] = row[idx]
		}
		rowCount++

		return target
	}
}
function sequence(n) {
	for (var i = 0, a=Array(n); i < n; ++i) a[i] = i
	return a
}


function random_latin(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// modified from https://github.com/sindresorhus/array-shuffle
function shuffle_latin(arr, seed) {
	var len = arr.length
	while (len) {
		var rnd = Math.floor(random_latin(seed) * len--)
		var tmp = arr[len]
		arr[len] = arr[rnd]
		arr[rnd] = tmp
	}
	return arr
}
