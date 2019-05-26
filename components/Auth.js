import React, { Component } from 'react';
import {
	View,
	Button,
	StyleSheet,
	ImageBackground,
	Image,
	TouchableOpacity,
	Text,
	Keyboard
} from 'react-native';
import Spinner from '../components/common/Spinner';
import Authentication from '../helpers/auth';
import imgSrc from '../assets/img/login.jpg';
import logoTransp from '../assets/img/logo_transparent.png';
import InputLogin from './common/InputLogin';

export default class Auth extends Component {
	myAuth = new Authentication();

	state = {
		name: '',
		email: '',
		password: '',
		loading: false,
		errors: '',
		newUser: false,
		keyboardOpen: false
	};

	authenticate = () => {
		const { myAuth } = this;
		const { email, password } = this.state;
		const { navigate } = this.props.navigation;
		this.setState({ loading: true });

		/* Try to login user  */
		myAuth
			.logIn(email, password)
			.then(user => {
				this.setState({ loading: false, errors: '' });
				navigate('App', { name: user.displayName });
			})
			.catch(error => {
				/* IF LOGIN FAIL TRY TO SIGN UP USER */
				this.myAuth
					.signUp(email, password)
					.then(UserCredentials => {
						//Set UserName
						return UserCredentials.user.updateProfile({
							displayName: this.state.name
						});
					})
					.then(user => {
						this.setState({ loading: false, errors: '' });
						navigate('App', { name: this.state.name });
					})
					.catch(() => {
						//CATCHES IF USER ALREADY EXISTS BUT PROVIDED WRONG PASSWORD
						this.setState({
							loading: false,
							errors: 'Wrong credentials'
						});
					});
			});
	};

	componentDidMount() {
		/* 	this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this.keyboardDidShow
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this.keyboardDidHide
		); */
	}

	componentWillUnmount() {
		/* 	this.keyboardDidShowListener && this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener && this.keyboardDidHideListener.remove(); */
	}

	keyboardDidShow = () => {
		this.setState({ keyboardOpen: true });
	};

	keyboardDidHide = () => {
		this.setState({ keyboardOpen: false });
	};

	onKeyboardOpenInputStyle = () => {
		return {
			marginTop: 40
		};
	};

	onChangeText = (text, key) => this.setState({ [key]: text });

	render() {
		const { loading, errors, newUser, keyboardOpen } = this.state;
		return (
			<ImageBackground
				source={imgSrc}
				style={{ width: '100%', height: '100%' }}
			>
				<View style={styles.appContainer}>
					{!keyboardOpen && (
						<Image
							source={logoTransp}
							style={{
								flex: 1,
								width: '100%'
							}}
							resizeMode="contain"
						/>
					)}
					<View
						style={[
							styles.containerInput,
							keyboardOpen ? this.onKeyboardOpenInputStyle() : null
						]}
					>
						<View style={styles.title} />
						{newUser && (
							<InputLogin
								placeholder="name"
								onChangeTextInput={text => this.onChangeText(text, 'name')}
								iconName="user"
							/>
						)}
						<InputLogin
							placeholder="email"
							onChangeTextInput={text => this.onChangeText(text, 'email')}
							iconName="envelope"
						/>
						<InputLogin
							placeholder="password"
							onChangeTextInput={text => this.onChangeText(text, 'password')}
							iconName="lock"
							errors={errors}
							secure={true}
						/>
						<View style={styles.btn}>
							{!loading && (
								<Button
									title="Sign In"
									onPress={this.authenticate}
									color="#54BFA1"
								/>
							)}
							{loading && <Spinner color="#fff" />}
						</View>
						<TouchableOpacity
							onPress={() => this.setState({ newUser: true })}
							style={styles.signUp}
						>
							<Text>Don't have an account</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	containerInput: {
		width: '80%',
		borderRadius: 5
	},
	btn: {
		marginTop: 20
	},
	textStyle: {
		color: '#fff',
		fontWeight: '700'
	},
	signUp: {
		alignItems: 'center',
		marginVertical: 30
	}
});
