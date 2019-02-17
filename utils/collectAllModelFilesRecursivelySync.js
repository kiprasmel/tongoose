/*
 * collectAllModelFilesRecursivelySync.js
 *
 * *self explanatory*
 *
 * Copyright (c) 2019 Kipras Melnikovas
 * MIT Licensed
 */

const fs = require("fs");
const path = require("path");

function collectAllModelFilesRecursivelySync(dir, acceptableFiles = /(?<!\.d)\.[jt]sx?$/) {
	let currentFileArray = [];

	if (fs.lstatSync(dir).isFile()) {
		return [dir];
	}

	fs.readdirSync(dir).forEach((currFileOrFolder) => {
		const newFileOrFolder = path.join(dir, currFileOrFolder);

		// if is file & matches `acceptableFiles` regex - add it to array
		if (fs.lstatSync(newFileOrFolder).isFile() && acceptableFiles.test(newFileOrFolder)) {
			currentFileArray.push(newFileOrFolder);
		}

		// else, if it's a directory - continue searching
		else if (fs.lstatSync(newFileOrFolder).isDirectory()) {
			currentFileArray = [
				...currentFileArray,
				...collectAllModelFilesRecursivelySync(newFileOrFolder),
			];
		}

		// acceptableFiles.test(currFileOrFolder)
		// 	? currentFileArray.push(newFileOrFolder)
		// 	: collectAllModelFilesRecursivelySync(newFileOrFolder);
	});

	return currentFileArray;
}

module.exports = collectAllModelFilesRecursivelySync;
