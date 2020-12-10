import React from "react";
import _ from "lodash";

import "./css.css";
import "./style.scss";
import { loggen } from "./loggen";

export const App = (): JSX.Element => {
	const phrase = _.join(["Click", "me"], " ");
	loggen();
	return (
		<div className="hello">
			<button className="mdc-button foo-button">
				<div className="mdc-button__ripple"></div>
				<span className="mdc-button__label">{phrase}</span>
			</button>

			<div>Hello world</div>
		</div>
	);
};
