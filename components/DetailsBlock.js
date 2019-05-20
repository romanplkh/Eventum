import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cleanText } from '../helpers/misc';

const DetailsBlock = props => {
	return (
		<View style={styles[props.style]}>
			<Text style={styles[props.textStyle]}>{cleanText(props.text)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		margin: 13
	},
	titleText: {
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#000',
		fontSize: 20
	},
	map: {
		width: '100%',
		height: 300
	},
	organizer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,
		marginHorizontal: 13
	},
	organizerText: {
		textAlign: 'justify',
		lineHeight: 20.5
	}
});

export default DetailsBlock;
