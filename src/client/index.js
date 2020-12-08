import _ from "lodash";
import "./styles/style.scss";
import "./styles/css.css";
import { alertans } from "./javascript/alertans";

function component() {
	const element = document.querySelector("#root");
	const btn = document.createElement("button");
	const someText = document.createElement("div");

	// Lodash installed by npm and now can be impored directly to index.js
	element.innerHTML = _.join(["Hello", "webpack"], " ");
	element.classList.add("hello");

	btn.innerHTML = "Click Moi";
	btn.onclick = alertans;

	someText.innerHTML = "Here I can put some ";

	element.appendChild(btn);
	element.append(someText);

	return element;
}

document.body.appendChild(component());

if (module.hot) {
	module.hot.accept("./javascript/alertans.js", function () {
		console.log("Accepting the updated alertans module!");
		alertans();
	});
}
