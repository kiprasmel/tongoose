function collectUniqueTypesRecursivelyDFS(startingObject = {}) {
	let collectedTypes = [];
	const basicValueMatchingRegex = /(?!type:\n?\s*\n?)(\[)?(string|number|date|buffer|boolean|mixed|objectid|array|decimal128|map|null|true|false)(\])?/g;
	``; // `undefined` is not included

	if (typeof startingObject !== "object") {
		return [];
	}

	// Object.entries(startingObject).forEach(([key, value]) => {
	Object.values(startingObject).forEach((value) => {
		// do stuff
		console.log("\n");

		// do nothing, but first make sure that there isn't anything deeper we will have basic types predefined
		if (
			basicValueMatchingRegex.test(value) ||
			(value.type && basicValueMatchingRegex.test(value.type)) ||
			typeof value === "undefined"
		) {
			// continue;
			console.log(
				"skipping. value =",
				value,
				"typeof value =",
				typeof value,
				"\nvalue.type =",
				value.type
			);
		}

		// foo: { bar: baz }
		// else if (value) {
		// 	console.log("recursively going with `value` =", value);
		// 	collectedTypes = [
		// 		...collectedTypes, // old
		// 		JSON.stringify(value), // new
		// 		...collectUniqueTypesRecursivelyDFS(value), // derived from new
		// 	];
		// }

		// foo: { type: someTypeOrDeeperNestedTypes }
		// might still contain more deeper types inside
		else if (value.type) {
			console.log("recursively going with `value.type` =", value.type);
			collectedTypes = [
				...collectedTypes, // old
				JSON.stringify(value.type), // new
				...collectUniqueTypesRecursivelyDFS(value.type), // derived from new
			];
		}

		// #TODO - not sure if this is needed / necessary
		// foo: [{ type: someTypeOrDeeperNestedTypes }]
		// might still contain more deeper types inside
		else if (value[0] && value[0].type) {
			console.log("recursively going with `value[0].type` =", value[0].type);
			collectedTypes = [
				...collectedTypes, // old
				JSON.stringify(value.type[0]), // new
				...collectUniqueTypesRecursivelyDFS(value[0].type), // derived from new
			];
		}

		// continue searching
		else {
			console.log("unmatched. value =", value, "\nvalue.type =", value.type);
			// if (typeof value === "object") {

			// }

			collectedTypes = [...collectedTypes, ...collectUniqueTypesRecursivelyDFS(value.type)];
			// if (value || value.type) {
			// 	console.log("going recursively.");
			// 	collectedTypes = [...collectedTypes, ...collectUniqueTypesRecursivelyDFS(value)];
			// }
		}
	}); /** Object.values().forEach */

	return collectedTypes;
} /** collectUniqueTypesRecursivelyDFS */

module.exports = collectUniqueTypesRecursivelyDFS;
