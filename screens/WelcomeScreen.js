import React, { Component } from 'react';
import { View } from 'react-native';
import Slides from '../components/Slides';
import firebase from 'firebase';
import Spinner from '../components/common/Spinner';
import { SLIDE_DATA } from '../assets/slidersData';

export default class WelcomeScreen extends Component {
	state = {
		user: true
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.navigation.navigate('Main', { name: user.displayName });
			} else {
				this.setState({ user: false });
			}
		});
	}

	onSignMeInHandler = () => {
		this.props.navigation.navigate('Auth');
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Slides data={SLIDE_DATA} onSignMeIn={this.onSignMeInHandler} />
				<View style={{ position: 'relative', top: -200 }}>
					{this.state.user && <Spinner color="#fff" />}
				</View>
			</View>
		);
	}
}
