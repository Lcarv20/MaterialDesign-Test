import React from 'react';
import {
	makeStyles,
	Box,
	Container,
	Button,
	IconButton,
	ButtonGroup,
	Checkbox,
} from '@material-ui/core';
import { Add, Delete, CakeOutlined, CakeRounded } from '@material-ui/icons';

const styles = makeStyles({
	box: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		borderRadius: '5px',
		border: 0,
		color: 'white',
	},
	container: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		minHeight: '100px',
		color: 'white',
		borderRadius: '5px',
		textAlign: 'center',
		margin: '1rem auto',
		padding: '1rem',
	},
	button: {
		margin: '0 1rem',
	},
});

export const CompBox: React.FC = () => {
	const classes = styles();
	return (
		<Box className={classes.box} paddingY={3} textAlign={'center'}>
			<h3>This is a simple Box Element with custom styles</h3>
		</Box>
	);
};

export const CompContainer: React.FC = () => {
	const classes = styles();
	return (
		<Container maxWidth="xs" component="span" className={classes.container}>
			<h3>This is a simple container small size</h3>
			<p>
				It is used to wrapp other components. It is possible to adjust it&apos;s
				with
			</p>
			<p>As I keep adding text it grows</p>
		</Container>
	);
};

export const CompButton: React.FC = () => {
	const classes = styles();

	return (
		<Container maxWidth="md">
			<Box paddingY="10px" borderBottom="2px dotted gray" m={0}>
				<Button className={classes.button} variant="text" size="small">
					Button
				</Button>

				<Button className={classes.button} variant="contained" color="primary">
					Button
				</Button>

				<Button
					className={classes.button}
					variant="outlined"
					color="secondary"
					size="large">
					Button
				</Button>
			</Box>

			<Box paddingY="10px" borderBottom="2px dotted gray">
				<IconButton aria-label="Add" size="small">
					<Add />
				</IconButton>

				<IconButton aria-label="Delete" size="medium">
					<Delete color="secondary" />
				</IconButton>

				<IconButton aria-label="Cake">
					<CakeOutlined color="primary" />
				</IconButton>
			</Box>

			<Box paddingY="10px" borderBottom="2px dotted gray">
				<Button
					variant="contained"
					color="secondary"
					className={classes.button}
					startIcon={<Delete />}>
					Delete
				</Button>

				<Button
					variant="outlined"
					color="primary"
					className={classes.button}
					endIcon={<CakeRounded />}>
					Happy Birthday
				</Button>
			</Box>
			<Box paddingY="10px" borderBottom="2px dotted gray">
				<ButtonGroup color="primary" aria-label="outlined primary button group">
					<Button>One</Button>
					<Button>Two</Button>
					<Button>Three</Button>
				</ButtonGroup>
			</Box>
		</Container>
	);
};

export const CompCheckbox: React.FC = () => {
	const [checked, setChecked] = React.useState(true);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	return (
		<Container>
			<Box paddingY="10px" borderBottom="2px dotted gray">
				<Checkbox
					checked={checked}
					onChange={handleChange}
					inputProps={{ 'aria-label': 'primary checkbox' }}
				/>
				<Checkbox
					defaultChecked
					color="primary"
					inputProps={{ 'aria-label': 'secondary checkbox' }}
				/>
				<Checkbox
					defaultChecked
					indeterminate
					inputProps={{ 'aria-label': 'indeterminate checkbox' }}
				/>
				<Checkbox
					defaultChecked
					size="small"
					inputProps={{ 'aria-label': 'checkbox with small size' }}
				/>
				<Checkbox
					defaultChecked
					size="small"
					inputProps={{ 'aria-label': 'checkbox with small size' }}
				/>
				<Checkbox inputProps={{ 'aria-label': 'checkbox with small size' }} />
				<Checkbox inputProps={{ 'aria-label': 'checkbox with small size' }} />
			</Box>
		</Container>
	);
};
