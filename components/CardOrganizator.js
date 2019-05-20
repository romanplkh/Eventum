import React from 'react';
import { View, Text } from 'react-native';

const CardOrganizator = props => {
	return (
		<View>
			<Text>{props.organizator}</Text>
		</View>
	);
};

export default CardOrganizator;
