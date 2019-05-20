const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
	apiKey: 'AIzaSyD0TWqzFsO2Fnk54CTrt6WP3Z3_o74FO-4',
	authDomain: 'eventum-2ccb0.firebaseapp.com',
	databaseURL: 'https://eventum-2ccb0.firebaseio.com',
	projectId: 'eventum-2ccb0',
	storageBucket: 'eventum-2ccb0.appspot.com',
	messagingSenderId: '27244757685',
	appId: '1:27244757685:web:dcf21b0a04e360df'
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
