import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Moment from 'react-moment';

const CardShortDes = props => {
	return (
		<View style={styles.cardDetails}>
			<Text style={[styles.textStyle, styles.titleStyle]}>{props.title}</Text>
			<Text style={styles.textStyle}>{props.place}</Text>
			<Moment style={styles.textStyle} element={Text} format="LLLL">
				{props.date}
			</Moment>
		</View>
	);
};

const styles = StyleSheet.create({
	cardDetails: {
		width: '75%',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'stretch'
	},
	textStyle: {
		color: '#000'
	},
	titleStyle: {
		fontSize: 18,
		fontWeight: 'bold'
	}
});

export default CardShortDes;
