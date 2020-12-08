import _ from "lodash";
import printMe from "./header-scripts.js";
import "./styles/style.scss";

function component() {
	const element = document.createElement("div");
	const btn = document.createElement("button");

	// Lodash installed by npm and now can be impored directly to index.js
	element.innerHTML = _.join(["Hello", "webpack"], " ");
	element.classList.add("hello");

	btn.innerHTML = "Click Moi";

	btn.onclick = printMe;

	element.appendChild(btn);

	return element;
}

document.body.appendChild(component());
