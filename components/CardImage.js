import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';

const CardImage = props => {
	return (
		<Image
			style={styles.img}
			source={{
				uri: `${props.source}`
			}}
			resizeMode="contain"
		/>
	);
};

const styles = StyleSheet.create({
	img: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: 180,
		opacity: 0.95
	}
});

export default CardImage;
