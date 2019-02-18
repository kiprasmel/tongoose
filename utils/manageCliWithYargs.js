/*
 * manageCliWithYargs.js
 *
 * Handle the Cli input with `yargs`
 *
 * http://yargs.js.org/docs/
 *
 *
 * Copyright (c) 2019 Kipras
 * MIT Licensed
 */

const chalk = require("chalk");
const yargs = require("yargs");

function manageCliWithYargs() {
	yargs
		.scriptName("")
		.usage(
			chalk.bgBlack(`
${chalk.bold.cyanBright("Usage:")} \
${chalk.bold.greenBright("tongoose")} \
${chalk.greenBright("./path/to/models/")} \
[${chalk.greenBright("--opt")} [${chalk.greenBright("arg")}]] \
`)
		)

		.option("s", {
			alias: ["src", "source"],
			requiresArg: true,
			demandOption: false,
			describe: `\
[${chalk.redBright("required")}] \
[${chalk.greenBright("selected by default")}] \
relative path to mongoose models' directory\n`,
		})

		.option("n", {
			alias: ["noFormat"],
			requiresArg: false,
			demandOption: false,
			type: "boolean",
			describe: `\
[${chalk.greenBright("auto")}=${chalk.cyanBright("false")}] \
do not format the type definition files
			`,
		})

		.option("o", {
			alias: "output",
			requiresArg: true,
			demandOption: false,
			// type: "string",
			describe: `\
[${chalk.greenBright("auto")}=${chalk.cyanBright(
				"source/index.d.ts"
			)}] relative path for index.d.ts type definition output\n`,
		})

		.option("v", { alias: "version" })
		.option("h", { alias: "help" })
		.example("tongoose ./src/models")
		.example("tongoose ./src/models --noFormat")
		.example("tongoose --help")
		.updateStrings({})
		.help().argv;
}

module.exports = manageCliWithYargs;
