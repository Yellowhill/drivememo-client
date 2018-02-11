import React from 'react';
import { BackHandler } from 'react-native';
import RegisterForm from '../Blocks/LoginForm.js';

import { connect } from 'react-redux';

import {
	register,
	setEmail,
	setPassword,
	setPasswordConfirm,
} from '../actions/auth.actions.js';

import { Container, Content, Spinner } from 'native-base';

class RegisterScreen extends React.Component {
	componentWillMount = () => {
		// const navigation = this.props.navigation;
		// const that = this;
		// BackHandler.addEventListener('hardwareBackPress', function() {
		// 	console.log('RegisterScreen RegisterScreen', that);
		// 	navigation.goBack();
		// 	return true;
		// });
	};

	componentWillUnmount = () => {
		//BackHandler.removeEventListener();
	};

	handleEmailChange = (email) => {
		//TODO email validation here
		this.props.setEmail(email.trim());
	};

	handlePasswordChange = (password) => {
		//TODO password validation here
		this.props.setPassword(password.trim());
	};

	handlePasswordConfirmChange = (passwordConfirm) => {
		//TODO password validation here
		this.props.setPasswordConfirm(passwordConfirm.trim());
	};

	handleSubmit = () => {
		const { email, password, passwordConfirm } = this.props.registerScreen;
		console.log('HANDLE SUBMIT', email, password);
		this.props.register({
			email,
			password,
			passwordConfirm,
		});
	};

	render() {
		console.log('registerScreen render this.props: ', this.props);
		const { showPassword } = this.props.registerScreen;
		return (
			<Container>
				<Content>
					{this.props.registerScreen.loading ? (
						<Spinner color="black" />
					) : (
						<RegisterForm
							registerForm
							onEmailChange={this.handleEmailChange}
							onPasswordChange={this.handlePasswordChange}
							onPasswordConfirmChange={this.handlePasswordConfirmChange}
							showPassword={showPassword}
							btnText="Rekisteröidy"
							onSubmit={this.handleSubmit}
						/>
					)}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ authReducer, generalReducer }) => ({
	registerScreen: Object.assign({}, authReducer, generalReducer),
});

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		setEmail: (text) => dispatch(setEmail(text)),
// 		setPassword: (text) => dispatch(setPassword(text)),
// 		setPasswordConfirm: (text) => dispatch(setPasswordConfirm(text)),
// 		register: (email, password) => dispatch(register(email, password)),
// 	};
// };
export default connect(mapStateToProps, {
	register,
	setEmail,
	setPassword,
	setPasswordConfirm,
})(RegisterScreen);
