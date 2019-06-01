import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

//GET THE WIDTH OF DEVICE SCREEN
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends Component {
	renderLastSlide(index) {
		/* IF IT IS LAST SLIDE RENDER BUTTON */
		return index === this.props.data.length - 1 ? (
			<Button
				title="Sign Me In"
				buttonStyle={styles.btnStyle}
				onPress={this.props.onSignMeIn}
			/>
		) : null;
	}

	renderSlides = () => {
		return this.props.data.map((slide, i) => {
			return (
				<View
					key={slide.text}
					style={[styles.slideStyle, { backgroundColor: slide.color }]}
				>
					<Text style={styles.slideText}>{slide.text}</Text>
					{this.renderLastSlide(i)}
				</View>
			);
		});
	};
	render() {
		return (
			<ScrollView style={{ flex: 1 }} horizontal={true} pagingEnabled={true}>
				{this.renderSlides()}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	slideText: {
		fontSize: 30,
		color: '#fff',
		textAlign: 'center'
	},
	slideStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH
	},
	btnStyle: {
		backgroundColor: '#529AF2',
		marginTop: 15
	}
});
