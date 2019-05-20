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

	fireBaseUserChecker = () => {
		//CREATE A REF TO THE FIREBASE LISTENERS, SO WE CAN REMOVE IT ONCE WE ARE ON THE MAIN PAGE
		this.fireBaseListener = firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.navigation.navigate('Main', { name: user.displayName });
			} else {
				this.setState({ user: false });
			}
		});
	};

	componentDidMount() {
		this.fireBaseUserChecker();
	}

	//REMOVE ASYNC LISTENERS FROM FIREBASE SO IT DOES NOT FIRE ON UNMOUNTED COMPONENT
	componentWillUnmount() {
		this.fireBaseListener && this.fireBaseListener();
		this.fireBaseUserChecker = undefined;
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
