/*
 * magicallyConvertMongooseSchemaToTypeScriptReadyJSObjectRecursively.js
 *
 * This took way longer than I'd like to admit haha, but I love and am
 * crazy excited about this utility actually working!
 *
 * This took sooo much work & refactoring lol - refactoring as from
 * partly working to no longer working to somewhat working again to
 * finally working :D Just goes to show that you'll probably fail a lot
 * before you finally succeed, and that's completely fine!
 * You got it! 😎
 *
 * Copyright (c) 2019 Kipras Melnikovas
 * MIT Licensed
 */

/**
 * cloning an object with any data loss in unacceptable,
 * because it breaks things.
 *
 * see https://stackoverflow.com/a/122704
 *
 * if we don't clone properly, things get stuck
 * and we get a stack overflow
 * (for example, https://i.imgur.com/qLuamCh.jpg)
 */
const cloneDeep = require("lodash.clonedeep");

// the `objValue.required === "true"` check is neccessary because we're
// parsing strings, so yeah #IWillRefactorThisLATER
function isRequired(objValue) {
	return !!(objValue.required && (objValue.required === true || objValue.required === "true"));
}

function magicallyConvertMongooseSchemaToTypeScriptReadyJSObjectRecursively(startingObj, constModelFileNameArray) {
	let startingObject = cloneDeep(startingObj);

	// NOTE! if `variable === null`, `typeof variable` => "object"
	// This is a bug in ECMAScript, and thus we handle it this way
	// Read more @ https://www.ecma-international.org/ecma-262/5.1/#sec-11.4.3

	// NOTE! types of `Boolean`, `Number`, `[Boolean]`, `[Number]`
	// are converted into strings BEFORE calling this function,
	// hence the `if (typeof startingObject === "string")` will catch them

	// NOTE! `typeof [] === "object"` => `true`. Array is okay - this statement will evaluate to false.

	// NOTE! The order of these statements IS VERY IMPORTANT!

	if (typeof startingObject !== "object" || startingObject === null) {
		if (startingObject === undefined || typeof startingObject === "undefined") {
			return "undefined";
		} //
		if (startingObject === null) {
			return "null";
		} //
		if (typeof startingObject === "string") {
			if (startingObject === "Array") {
				return "Array<any>";
			}
			// the goal is to delete this `else if` statement. We're getting there :D
			if (startingObject === "Buffer" || startingObject === "Mixed" || startingObject === "Map") {
				return "any";
			}
			// NOTE! The ORDER of the operations done here IS VERY IMPORTANT!
			let typeIsArray = false;

			if (startingObject[0] === "[" && startingObject[startingObject.length - 1] === "]") {
				typeIsArray = true;
				startingObject = startingObject.substring(1, startingObject.length - 1); // [foo] => foo
			}

			// if is an interface (refers to one of collected mongoose model files)
			if (constModelFileNameArray.includes(startingObject)) {
				startingObject = `I${startingObject}`; // Foo => IFoo
			}

			return typeIsArray ? `Array<${startingObject}>` : startingObject;
		} //
		if (typeof startingObject !== "string") {
			return JSON.stringify(startingObject);
		}
	}

	const collectedTypes = {};
	let isArray = false;

	if (Array.isArray(startingObject)) {
		isArray = true;
		startingObject = startingObject[0];
		/**
		 * ```md
		 * since an array will always have only one object describing it's type, this is okay.
		 * Otherwise, instead of using `Object.entries(startingObject[0])` we'd need to do this:
		 *
		 *	```bash
		 *  startingObject.forEach((objectInsideArray) => {
		 *		Object.entries(objectInsideArray).forEach(([key, value]) => {
		 *	 		// same as below
		 *		})
		 *  })
		 * ```
		 *
		 * ```md
		 * note that if we set `isArray` to `true`, at the end of this function we wrap `collectedTypes` into
		 * an array, as seen at the end of this function.
		 *
		 * this is done to accurately represent the schema
		 * (if we set `startingObject` to `startingObject[0]`,
		 * the array part is temporarely lost untill we restore it!)
		 * ```
		 */
	}

	Object.entries(startingObject).forEach(([key, value]) => {
		// console.log("\n");
		// console.log(index, key, "<- key");
		// console.log(JSON.stringify(value));

		/**
		 * first always check the `value.type`, only then the `value`
		 */

		// object:
		// NOTE! if `variable === null`, `typeof variable` => "object"
		// This is a bug in ECMAScript, and thus we handle it like this
		// Read more @ https://www.ecma-international.org/ecma-262/5.1/#sec-11.4.3
		if (typeof value === "object" && value !== null) {
			if (value.type) {
				// console.log("obj; value.type = ", value.type, " key =", key);
				collectedTypes[
					key + (isRequired(value) ? "" : "?")
				] = magicallyConvertMongooseSchemaToTypeScriptReadyJSObjectRecursively(
					value.type,
					constModelFileNameArray
				);
			}

			// if value.type isn't present, there's no way to add a `required` prop, hence don't even check for it (it's always optional)
			else if (value) {
				// console.log("obj; value");
				collectedTypes[`${key}?`] = magicallyConvertMongooseSchemaToTypeScriptReadyJSObjectRecursively(
					value,
					constModelFileNameArray
				);
			}
		}

		// array:
		else if (Array.isArray(value)) {
			if (value[0].type) {
				// console.log("array; value[0].type");
				collectedTypes[
					key + (isRequired(value[0]) ? "" : "?")
				] = magicallyConvertMongooseSchemaToTypeScriptReadyJSObjectRecursively(
					value[0].type,
					constModelFileNameArray
				);
			}

			// if value[0].type isn't present, there's no way to add a `required` prop, hence don't even check for it (it's always optional)
			else if (value[0]) {
				// console.log("array; value[0]");
				collectedTypes[`${key}?`] = magicallyConvertMongooseSchemaToTypeScriptReadyJSObjectRecursively(
					value[0],
					constModelFileNameArray
				);
			}
		}

		// default:
		else {
			// will do all value checks (as defined in the start of this function)
			// and will return the proper result
			collectedTypes[`${key}?`] = magicallyConvertMongooseSchemaToTypeScriptReadyJSObjectRecursively(
				value,
				constModelFileNameArray
			);
		}

		// else {
		// 	console.log("else! value = ", value);
		// 	// #TODO #WARN - replace double equals with triple, just make sure that things work
		// 	// console.log("\nElse happened. value =", value);
		// 	if (value[0] == "[" && value[value.length - 1] == "]") {
		// 		// console\.log("\tarray", key, value);
		// 		collectedTypes[key + "?"] = `Array<${value.substring(1, value.length - 1)}>`;
		// 	} else {
		// 		// console\.log("\tNOT an array", key, value);
		// 		collectedTypes[key + "?"] = value;
		// 	}
		// 	// console\.log("addedValue = ", collectedTypes[key + "?"]);
		// }
	}); /** Object.entries(startingObject).forEach */

	// #BEFORE_ARRAY
	// return isArray ? [collectedTypes] : collectedTypes;

	// #AFTER_ARRAY
	return isArray ? `Array<${JSON.stringify(collectedTypes)}>` : collectedTypes;
} /** magicallyConvertMongooseSchemaToTypeScriptReadyJSObjectRecursively */

module.exports = magicallyConvertMongooseSchemaToTypeScriptReadyJSObjectRecursively;
