function isRequired(objValue) {
	return objValue.required && objValue.required === true ? true : false;
}

function collectUniqueTypesRecursivelyDFS(startingObject = {}) {
	let collectedTypes = {};
	const basicValueMatchingRegex = /(?!type:\n?\s*\n?)(\[)?(string|number|date|buffer|boolean|mixed|objectid|array|decimal128|map|null|true|false)(\])?/g;
	``; // `undefined` is not included

	if (typeof startingObject !== "object") {
		return {};
	}

	Object.entries(startingObject).forEach(([key, value], index) => {
		console.log("\n");
		console.log(index, key, "<- key");
		console.log(JSON.stringify(value));

		// first always check the .type, only the the propObjOrArr:

		// object:
		if (typeof value === "object") {
			if (value.type) {
				console.log(
					"obj; value.type; key =",
					key,
					"after isReq:",
					key + (isRequired(value) ? "" : "?")
				);

				collectedTypes[key + (isRequired(value) ? "" : "?")] = value.type;

				// collectedTypes[key + (isRequired(value) ? "" : "?")] = value.type;

				// collectedTypes.push(
				// 	JSON.stringify({
				// 		[key + (isRequired(value) ? "" : "?")]: value.type,
				// 	})
				// );
			}
			// if value.type isn't present, there's no way to add a `required` prop, hence don't even check for it (it's always optional)
			else if (value) {
				console.log("obj; value");
				collectedTypes[key + "?"] = value;

				// collectedTypes[key + "?"] = value;

				// collectedTypes.push(
				// 	JSON.stringify({
				// 		[key + "?"]: value,
				// 	})
				// );
			}
		}

		// array:
		else if (typeof value === "array") {
			if (value[0].type) {
				console.log("array; value[0].type");

				collectedTypes[key + (isRequired(value[0]) ? "" : "?")] = value[0].type;

				// collectedTypes[key + (isRequired(value[0]) ? "" : "?")] = value[0].type;

				// collectedTypes.push(
				// 	JSON.stringify({
				// 		[key + (isRequired(value[0]) ? "" : "?")]: value[0].type,
				// 	})
				// );
			}
			// if value[0].type isn't present, there's no way to add a `required` prop, hence don't even check for it (it's always optional)
			else if (value[0]) {
				console.log("array; value[0]");
				collectedTypes[key + "?"] = value[0];
				// collectedTypes.push(
				// 	JSON.stringify({
				// 		[key + "?"]: value[0],
				// 	})
				// );
			}
		}
		// default:
		else {
			// baz
			console.log("Error! (or not)... `type` neither array nor object, type =", typeof value);
			return value;
		}

		// if (typeof value === "object" && value.type) {
		// 	collectedTypes.push({ key, type: value.type });
		// }
		// if (typeof value === "object") {
		// 	collectedTypes.push({ key, type: value });
		// } else if (typeof value === "array") {
		// } else {
		// }

		//
	}); /** Object.values().forEach */

	return collectedTypes;
} /** collectUniqueTypesRecursivelyDFS */

module.exports = collectUniqueTypesRecursivelyDFS;
