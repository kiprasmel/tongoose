const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const yargs = require("yargs");
const toFilename = require("./toFilename");

function prepareDotTongooseDir(pathToDotTongooseDir, directoriesToCreateInsideDotTongooseDir) {
	// clean up the .tongoose/ directory from last time so it's fresh

	// debug not set or false
	if (!yargs.argv.debug) {
		return;
	}

	rimraf.sync(pathToDotTongooseDir);

	// create required directories
	for (const dir of directoriesToCreateInsideDotTongooseDir) {
		fs.mkdirSync(dir);
	}

	// Provide some basic but key information to avoid miss-understandings
	fs.writeFileSync(
		path.join(pathToDotTongooseDir, "README"),
		`\
${toFilename(pathToDotTongooseDir)}

🐛 Please submit issues / bugs / feedback to https://github.com/tongoose/tongoose/issues

WARNING:

Everything inside this directory will be wiped out
after running tongoose with \`--debug\` option (\`tongoose --debug\`),
hence you shouldn't put anything here -
it's for reading / debugging purposes only.
`
	);
}

module.exports = prepareDotTongooseDir;
