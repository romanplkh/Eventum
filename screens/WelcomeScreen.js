import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import NetInfo from '@react-native-community/netinfo';
import Slides from '../components/Slides';
import Spinner from '../components/common/Spinner';
import OfflineMode from '../components/OfflineMode';
import { SLIDE_DATA } from '../assets/slidersData';

export default class WelcomeScreen extends Component {
	state = {
		user: true,
		connection: true
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

	onConnection = () => {
		this.unsubscribe = NetInfo.addEventListener(state => {
			if (state.isConnected) {
				this.fireBaseUserChecker();
			}

			this.setState({ connection: state.isConnected });
		});
	};

	componentDidMount() {
		this.onConnection();
	}

	//REMOVE ASYNC LISTENERS SO IT DOES NOT FIRE ON UNMOUNTED COMPONENT
	componentWillUnmount() {
		this.fireBaseListener && this.fireBaseListener();
		this.fireBaseUserChecker = undefined;
		this.unsubscribe && this.unsubscribe();
		this.onConnection = undefined;
	}

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
