/*
 * toFilename.js
 *
 * *self explanatory*
 *
 * Copyright (c) 2019 Kipras Melnikovas
 * MIT Licensed
 */

// `foo/bar/baz.ext` => `baz.ext` || `baz`

function toFilename(pathToFileNameWithFilename = "", withExtension = true) {
	return withExtension
		? pathToFileNameWithFilename.replace(/.*[/\\]/g, "")
		: pathToFileNameWithFilename.replace(/.*[/\\](\w+)(\.\w+)?/g, "$1");
}

module.exports = toFilename;
