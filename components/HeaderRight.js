import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const HeaderRight = props => {
	return (
		<View
			style={{
				marginRight: 20,
				flexDirection: 'row',
				alignItems: 'center'
			}}
		>
			<Text style={{ color: '#fff', fontWeight: 'bold', marginRight: 10 }}>
				{props.email}
			</Text>
			<Icon
				name={props.icon}
				type="ionicon"
				color={props.color}
				onPress={props.onPress}
			/>
		</View>
	);
};

export default HeaderRight;
