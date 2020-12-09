import React from "react";
import _ from "lodash";

import "./styles/css.css";
import "./styles/style.scss";
import { alertans } from "./javascript/alertans";

export default function App() {
	alertans();
	const phrase = _.camelCase("Webpack, pain in the crack");
	return (
		<div className="hello">
			<h1>Hello there</h1>
			<p> Setting up Webpack with ts and sass/postcss!</p>
			<q> {phrase} </q>

			<ul>
				In this boilerplate I am free to use:
				<li>React</li>
				<li>Sass</li>
				<li>Css</li>
				<li>postcss</li>
				<li>Typescript</li>
				<li>TSX</li>
				<li>Javascript</li>
				<li>JSX</li>
				<p> next -&gt; The headache of gluglu Material design</p>
			</ul>
		</div>
	);
}
