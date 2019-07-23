/*
 * toClickablePath.js
 *
 * *self explanatory*
 *
 * Copyright (c) 2019 Kipras Melnikovas
 * MIT Licensed
 */

// foo/bar\index.js => foo\\bar\\index.js (clickable both in integrated & true prompt)
function toClickablePath(path) {
	return path.replace(/[/\\]/g, "\\\\");
}

module.exports = toClickablePath;
