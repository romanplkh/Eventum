import React, { Component } from 'react';
import { AppContainer } from './Navigation';
import ignoreWarnings from 'react-native-ignore-warnings';

ignoreWarnings('Setting a timer');

export default class App extends Component {
	render() {
		return <AppContainer />;
	}
}
