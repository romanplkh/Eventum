import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CardBlock = props => {
	return (
		<View style={styles.block}>
			<Text>{props.text}</Text>
			<Text style={[{ color: props.color }, styles.textDecoration]}>
				{props.value}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	block: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'nowrap',
		height: 50,
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 5,
		padding: 5
	},
	textDecoration: {
		fontWeight: 'bold'
	}
});

export default CardBlock;
