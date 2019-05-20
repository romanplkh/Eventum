import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground, Image } from 'react-native';
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
		errors: ''
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
				navigate('Main', { name: user.displayName });
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
						navigate('Main', { name: this.state.name });
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

	onChangeText = (text, key) => this.setState({ [key]: text });

	render() {
		const { loading, errors } = this.state;
		return (
			<ImageBackground
				source={imgSrc}
				style={{ width: '100%', height: '100%' }}
			>
				<View style={styles.appContainer}>
					<Image
						source={logoTransp}
						style={{
							flex: 1,
							width: '100%'
						}}
						resizeMode="contain"
					/>
					<View style={styles.containerInput}>
						<View style={styles.title} />
						<InputLogin
							placeholder="name"
							onChangeTextInput={(text, key) => this.onChangeText(text, 'name')}
							iconName="user"
						/>
						<InputLogin
							placeholder="email"
							onChangeTextInput={(text, key) =>
								this.onChangeText(text, 'email')
							}
							iconName="envelope"
						/>
						<InputLogin
							placeholder="password"
							onChangeTextInput={(text, key) =>
								this.onChangeText(text, 'password')
							}
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
		marginTop: 30,
		marginBottom: 30
	},
	textStyle: {
		color: '#fff',
		fontWeight: '700'
	}
});
