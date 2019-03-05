/*
 * showWarning.js
 *
 * *self explanatory*
 *
 * Copyright (c) 2019 Kipras Melnikovas
 * MIT Licensed
 */

const chalk = require("chalk");

function showWarning(msg) {
	console.log(`${chalk.yellowBright(`Warning`)}: ${msg}`);
}

module.exports = showWarning;
