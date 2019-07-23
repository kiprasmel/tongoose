/*
 * makeSureAtLeastOneFileExistsOrExit.js
 *
 * *self explanatory*
 *
 * Copyright (c) 2019 Kipras Melnikovas
 * MIT Licensed
 */

const chalk = require("chalk");
const showHelpAndExit = require("./showHelpAndExit");

function makeSureAtLeastOneFileExistsOrExit(relFilePathArrayLength, relPathToModelsDirOrFile) {
	if (relFilePathArrayLength <= 0) {
		showHelpAndExit(`\
${chalk.redBright("Error!")}
${chalk.yellowBright(
	`\
* 0 model files found!
> \`models\` directory path was set to \`${relPathToModelsDirOrFile}\``
)}`);
	}
}

module.exports = makeSureAtLeastOneFileExistsOrExit;
