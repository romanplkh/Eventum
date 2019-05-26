import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const OfflineBanner = props => {
	return (
		<View style={styles.offlineContainer}>
			<Text style={styles.offlineText}>{props.text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	offlineContainer: {
		backgroundColor: '#b52424',
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width,
		position: 'relative',
		top: 0,
		zIndex: 1
	},
	offlineText: {
		color: '#fff'
	}
});

export default OfflineBanner;
