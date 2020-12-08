import _ from "lodash";

function component() {
	const element = document.createElement("div");

	// Lodash installed by npm and now can be impored directly to index.js
	element.innerHTML = _.join(["Hello", "webpack"], " ");

	return element;
}

document.body.appendChild(component());
