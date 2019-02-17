/*
 * returnModelDirOrFileOrShowHelpAndExit.js
 *
 * *self explanatory*
 *
 * Copyright (c) 2019 Kipras Melnikovas
 * MIT Licensed
 */

const fs = require("fs");
const yargs = require("yargs");
const showHelpAndExit = require("./showHelpAndExit");

/**
 * by default, the yargs.argv object gets passed automatically;
 * you can override it by passing an argv object, but it's unnecessary
 */
function returnModelDirOrFileOrShowHelpAndExit(argvObj = yargs.argv) {
	if (argvObj.source && fs.existsSync(argvObj.source)) {
		return argvObj.source;
	}

	for (const possibleRelativeDirPath of argvObj["_"]) {
		if (fs.existsSync(possibleRelativeDirPath)) {
			return possibleRelativeDirPath;
		}
	}

	showHelpAndExit();
}

module.exports = returnModelDirOrFileOrShowHelpAndExit;
