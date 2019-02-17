/*
 * generateRelativePathForTypeDefinitionOutputFile.js
 *
 * *self explanatory*
 *
 * Copyright (c) 2019 Kipras Melnikovas
 * MIT Licensed
 */

const path = require("path");

function generateRelativePathForTypeDefinitionOutputFile(
	relPathToModelsDirOrFile = "./",
	fileArray
) {
	// relPathToModelsDirOrFile is a directory. output will go to `relPathToModelsDirOrFile/index.d.ts`
	if (fileArray.length > 1) {
		return path.join(relPathToModelsDirOrFile, "index.d.ts");
	}

	// relPathToModelsDirOrFile is a file.
	// we'll replace `path/to/file/theFile.ts` with `path/to/file/index.d.ts`
	// so that we can create the type definition (index.d.ts) file inside `path/to/file/` directory
	// (because `path/to/file/theFile.ts` is NOT a directory)
	else if (fileArray.length === 1) {
		return path.join(relPathToModelsDirOrFile.replace(/(.*[\/\\]).*/g, "$1"), "index.d.ts");
	} else makeSureAtLeastOneFileExistsOrExit(fileArray);
}

module.exports = generateRelativePathForTypeDefinitionOutputFile;
