import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import CardEvent from '../components/CardEvent';
import firebase from 'firebase';
import HeaderRight from '../components/HeaderRight';

export default class Main extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: 'Eventum',
			headerRight: (
				<HeaderRight
					email={navigation.getParam('name')}
					icon="md-log-out"
					color="#fff"
					onPress={() => {
						firebase
							.auth()
							.signOut()
							.then(() => navigation.navigate('Auth'));
					}}
				/>
			)
		};
	};


	//SCROLL TO TOP
	toTop = () => {
		this.refs.ScrollEvent.scrollTo({
			y: 0,
			animated: true,
			duration: 2000
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<FAB
					style={styles.fab}
					small
					icon="keyboard-arrow-up"
					onPress={this.toTop}
					color="#000"
				/>
				<ScrollView ref="ScrollEvent">
					<CardEvent navigation={this.props.navigation} />
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: '#00CFB6',
		zIndex: 9999
	}
});
