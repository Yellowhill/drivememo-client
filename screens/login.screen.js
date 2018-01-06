import React from 'react';

import LoginForm from '../Blocks/LoginForm.js';

import { connect } from 'react-redux';

// import {
//     checkAuth
// } from '../actions/auth.actions.js';

import {
	login,
	setEmail,
	setPassword,
	navigateToRegister,
	checkAuthAtStartUp,
} from '../actions/auth.actions.js';

import {
	Container,
	Content,
	Footer,
	FooterTab,
	Spinner,
	Button,
} from 'native-base';

import {
	ScrollView,
	Text,
	View,
	TouchableOpacity,
	KeyboardAvoidingView,
} from 'react-native';

class LoginScreen extends React.Component {
	componentWillMount() {
		console.log('loginscreen will mount pros: ', this.props);
		this.props.checkAuthAtStartUp();
	}
	handleEmailChange = email => {
		//TODO email validation here
		this.props.setEmail(email.trim());
	};

	handlePasswordChange = password => {
		//TODO password validation here
		this.props.setPassword(password.trim());
	};
	handleSubmit = () => {
		const { email, password } = this.props.loginScreen;
		console.log('HANDLE SUBMIT', email, password);
		this.props.login(email, password);
	};

	render() {
		console.log('loginscreen render this.props: ', this.props);
		const { showPassword } = this.props.loginScreen;
		return (
			<Container>
				<Content>
					{this.props.loginScreen.loading ? (
						<Spinner color="black" />
					) : (
						<LoginForm
							onEmailChange={this.handleEmailChange}
							onPasswordChange={this.handlePasswordChange}
							showPassword={showPassword}
							btnText="Kirjaudu"
							onSubmit={this.handleSubmit}
						/>
					)}
				</Content>
				{!this.props.loginScreen.loading && (
					<Footer>
						<FooterTab>
							<Button full onPress={() => this.props.navigateToRegister()}>
								<Text>Rekisteröidy</Text>
							</Button>
						</FooterTab>
					</Footer>
				)}
			</Container>
		);
	}
}

const mapStateToProps = ({ authReducer, generalReducer }) => ({
	loginScreen: Object.assign({}, authReducer, generalReducer),
});

const mapDispatchToProps = dispatch => {
	//console.log('loginscreen dispatch: ', dispatch)
	return {
		//"login:" what we get as pros to this component
		//login(email,password) - is from the actioncreator
		checkAuthAtStartUp: () => dispatch(checkAuthAtStartUp()),
		navigateToRegister: () => dispatch(navigateToRegister()),
		setEmail: text => dispatch(setEmail(text)),
		setPassword: text => dispatch(setPassword(text)),
		login: (email, password) => dispatch(login(email, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
//export default loginForm;
