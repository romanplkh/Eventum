import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Moment from 'react-moment';

const FavouriteDescription = props => {
	return (
		<View style={styles.cardDetails}>
			<Text> {props.place} </Text>
			<Moment element={Text} format="LL">
				{props.date}
			</Moment>
		</View>
	);
};

const styles = StyleSheet.create({
	cardDetails: {
		flex: 3,
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	textStyle: {
		color: '#000'
	},
	titleStyle: {
		fontSize: 18
	}
});

export default FavouriteDescription;
