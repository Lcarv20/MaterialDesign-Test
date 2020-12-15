import React from 'react';
import _ from 'lodash';

import './css.css';
import './style.scss';
import { loggen } from './loggen';
import like from './like.png';
import { ReactComponent as Luka } from './LuCa.svg';

export const App = (): JSX.Element => {
	const phrase = _.join(['Click', 'me'], ' ');
	return (
		<div className="hello">
			<button className="mdc-button foo-button" onClick={loggen}>
				<div className="mdc-button__ripple"></div>
				<span className="mdc-button__label">{phrase}</span>
			</button>

			<div className="css-div">This is a CSS Styled div</div>
			<div className="sass-div">This is a SASS Styled div</div>
			<img className="img" src={like} alt="hello" />
			<Luka className="svgi" />
		</div>
	);
};
