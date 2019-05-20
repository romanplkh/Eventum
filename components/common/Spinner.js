import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Spinner = props => {
	return (
		<View style={styles.spinnerContainer}>
			<ActivityIndicator
				size={props.size || 'large'}
				color={props.color || 'red'}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	spinnerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default Spinner;
