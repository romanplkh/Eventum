import React, { Component } from 'react';
import { AppContainer } from './Navigation';
import ignoreWarnings from 'react-native-ignore-warnings';

//INGORE WARNINGS ABOUT FIREBASE package setTimeout() warnings
ignoreWarnings('Setting a timer');

export default class App extends Component {
	render() {
		return <AppContainer />;
	}
}
