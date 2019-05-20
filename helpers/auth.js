import firebase from 'firebase';

export default class Authentication {
	logIn(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	signUp(email, password) {
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}

	getUser() {
		const user = firebase.auth().currentUser;
		return user;
	}

	logOut(navigation) {
		firebase
			.auth()
			.signOut()
			.then(() => navigation.navigate('Auth'));
	}
}
