import React from 'react';
import {
	View,
	Text,
} from 'react-native';
import DiningHours from './DiningHours';

import css from '../../styles/css';

const DiningDescription = ({
	name, description, regularHours, specialHours
}) => (
	<View style={css.dd_description_container}>
		<Text style={css.dd_description_nametext}>{name}</Text>
		{description
			? <Text style={css.dd_description_subtext}>{description}</Text>
			: null
		}

		<DiningHours
			hours={regularHours}
			style={css.dd_description_hours}
		/>

		{specialHours
			? <DiningHours hours={specialHours} specialHours style={css.dd_description_hours} />
			: null
		}
	</View>
);

export default DiningDescription;