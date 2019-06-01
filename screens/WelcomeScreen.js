import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import Slides from '../components/Slides';
import Spinner from '../components/common/Spinner';
import OfflineMode from '../components/OfflineMode';
import { SLIDE_DATA } from '../assets/slidersData';

export default class WelcomeScreen extends Component {
	state = {
		user: true,
		connection: true
	};

	//CHECK IF USER WAS LOGGED IN PREVIOUSLY
	componentDidMount() {
		this.fireBaseUserChecker();
	}

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

	//REMOVE ASYNC LISTENERS SO IT DOES NOT FIRE ON UNMOUNTED COMPONENT
	componentWillUnmount() {
		this.fireBaseListener && this.fireBaseListener();
		this.fireBaseUserChecker = undefined;
	}

	//REDIRECT TO LOGIN
	onSignMeInHandler = () => {
		this.props.navigation.navigate('Auth');
	};

	render() {
		const { connection } = this.state;
		return (
			<View style={{ flex: 1 }}>
				{connection && (
					<Slides data={SLIDE_DATA} onSignMeIn={this.onSignMeInHandler} />
				)}
				{!connection && <OfflineMode />}
				<View style={{ position: 'relative', top: -200 }}>
					{this.state.user && <Spinner color="#fff" />}
				</View>
			</View>
		);
	}
}
