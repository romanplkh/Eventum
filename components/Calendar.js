import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Moment from 'react-moment';

const Calendar = props => {
	return (
		<View style={styles.dateCal}>
			<Moment element={Text} style={styles.shortMonth} format="MMM">
				{props.children}
			</Moment>
			<Moment element={Text} style={styles.shortDay} format="DD">
				{props.children}
			</Moment>
		</View>
	);
};

const styles = StyleSheet.create({
	dateCal: {
		flex: 1,
		alignItems: 'center',
		marginRight: 13
	},
	shortDay: {
		fontWeight: 'bold',
		fontSize: 18
	},
	shortMonth: {
		color: '#f05537',
		fontWeight: 'bold',
		fontSize: 25
	}
});

export default Calendar;
