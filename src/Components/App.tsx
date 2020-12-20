import React from 'react';
import './style.scss';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
	CompBox,
	CompContainer,
	CompButton,
	CompCheckbox,
} from './material-ui/Components';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		debug: {
			borderBottom: '2px dashed red',
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
			minHeight: '20%',
		},
	})
);

const App = (): JSX.Element => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12} className={classes.debug}>
					<CompBox />
				</Grid>
				<Grid item xs={12} className={classes.debug}>
					<CompContainer />
				</Grid>
				<Grid item xs={12} lg={6} xl={6}>
					<Paper className={classes.paper}>
						<CompButton />
					</Paper>
				</Grid>
				<Grid item xs={12} lg={6} xl={6}>
					<Paper className={classes.paper}>
						<CompCheckbox />
					</Paper>
				</Grid>
				<Grid item xs={12} lg={6} xl={6}>
					<Paper className={classes.paper}>xs=3</Paper>
				</Grid>
				<Grid item xs={12} lg={6} xl={6}>
					<Paper className={classes.paper}>xs=3</Paper>
				</Grid>
				<Grid item xs={12} lg={6} xl={6}>
					<Paper className={classes.paper}>xs=3</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default App;
