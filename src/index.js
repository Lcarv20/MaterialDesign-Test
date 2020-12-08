import _ from "lodash";
import "./styles/style.css";

function component() {
	const element = document.createElement("div");

	// Lodash installed by npm and now can be impored directly to index.js
	element.innerHTML = _.join(["Hello", "webpack"], " ");
	element.classList.add("hello");

	return element;
}

document.body.appendChild(component());
