const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const toFilename = require("./toFilename");

function prepareDotTongooseDir(pathToDotTongooseDir, directoriesToCreateInsideDotTongooseDir) {
	// clean up the .tongoose/ directory from last time so it's fresh
	rimraf.sync(pathToDotTongooseDir);

	// create required directories
	for (let dir of directoriesToCreateInsideDotTongooseDir) {
		fs.mkdirSync(dir);
	}

	// Provide some basic but key information to avoid miss-understandings
	fs.writeFileSync(
		path.join(pathToDotTongooseDir, "README.md"),
		`\
# ${toFilename(pathToDotTongooseDir)}

## WARNING

> Everything inside this directory will be wiped out after running the \`tongoose\` script, hence you shouldn't put anything here - it's for reading / debugging purposes only.
`
	);
}

module.exports = prepareDotTongooseDir;
