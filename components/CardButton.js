import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

const CardButton = props => {
	return (
		<View style={styles.btn}>
			<Button color={props.color} title={props.title} onPress={props.onPress} />
		</View>
	);
};

const styles = StyleSheet.create({
	btn: {
		marginTop: 10
	}
});

export default CardButton;
