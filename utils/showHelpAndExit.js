/*
 * showHelpAndExit.js
 *
 * *self explanatory*
 *
 * Copyright (c) 2019 Kipras Melnikovas
 * MIT Licensed
 */

const yargs = require("yargs");

function showHelpAndExit(errorMsg) {
	yargs.showHelp();
	if (errorMsg) {
		console.log(`\n${errorMsg}`);
	}
	process.exit(1);
}

module.exports = showHelpAndExit;
