import React from "react";
import _ from "lodash";

import "./styles/css.css";
import "./styles/style.scss";

export default function App() {
	const phrase = _.join(["Click", "me"], " ");
	return (
		<div className="hello">
			<button className="mdc-button foo-button">
				<div className="mdc-button__ripple"></div>
				<span className="mdc-button__label">{phrase}</span>
			</button>
		</div>
	);
}
