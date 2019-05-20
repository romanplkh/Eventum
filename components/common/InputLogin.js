import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const InputLogin = props => {
	return (
		<Input
			inputStyle={styles.textStyle}
			placeholder={props.placeholder}
			onChangeText={(text, key) => props.onChangeTextInput(text, key)}
			leftIcon={{
				type: 'font-awesome',
				name: `${props.iconName}`,
				color: `${props.iconColor || '#fff'}`,
				size: 15
			}}
			leftIconContainerStyle={{
				alignItems: 'center',
				justifyContent: 'center'
			}}
			placeholderTextColor="rgba(255,255,255, 0.5)"
			errorStyle={{ color: '#fff' }}
			errorMessage={props.errors ? props.errors : ''}
			secureTextEntry={props.secure}
		/>
	);
};

const styles = StyleSheet.create({
	textStyle: {
		color: '#fff',
		fontWeight: '700'
	}
});

export default InputLogin;
