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
	StyleProvider,
} from 'native-base';

import {
	ScrollView,
	Text,
	View,
	TouchableOpacity,
	KeyboardAvoidingView,
	BackHandler,
} from 'react-native';

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import styled from 'styled-components/native';

const StyledFooter = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
`;

class LoginScreen extends React.Component {
	componentWillMount() {
		const navigation = this.props.navigation;
		//console.log('loginscreen WILL MOUNT: ', navigation);
		// BackHandler.addEventListener('hardwareBackPress', function() {
		// 	console.log('loginscreen WILL MOUNT: ', navigation);
		// 	if (navigation.state.routeName === 'Login') {
		// 		BackHandler.exitApp();
		// 		return true;
		// 	}
		// });
		this.props.checkAuthAtStartUp();
	}
	componentWillUnmount = () => {
		console.log('LOGINSCREEN WILL UNMOUNT');
		//BackHandler.removeEventListener('hardwareBackPress');
	};
	handleEmailChange = (email) => {
		//TODO email validation here
		this.props.setEmail(email.trim());
	};

	handlePasswordChange = (password) => {
		//TODO password validation here
		this.props.setPassword(password.trim());
	};
	handleSubmit = () => {
		const { email, password } = this.props.loginScreen;
		console.log('HANDLE SUBMIT', email, password);
		this.props.login(email, password);
	};

	render() {
		//console.log('loginscreen render this.props: ', this.props);
		const { showPassword } = this.props.loginScreen;
		return (
			<StyleProvider style={getTheme(material)}>
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
						<StyledFooter>
							<Button
								transparent
								onPress={() => this.props.navigation.navigate('Register')}
							>
								<Text>Rekisteröidy</Text>
							</Button>
						</StyledFooter>
					)}
				</Container>
			</StyleProvider>
		);
	}
}

const mapStateToProps = ({ authReducer, generalReducer }) => ({
	loginScreen: Object.assign({}, authReducer, generalReducer),
});

// const mapDispatchToProps = (dispatch) => {
// 	//console.log('loginscreen dispatch: ', dispatch)
// 	return {
// 		//"login:" what we get as pros to this component
// 		//login(email,password) - is from the actioncreator
// 		checkAuthAtStartUp: () => dispatch(checkAuthAtStartUp()),
// 		navigateToRegister: () => dispatch(navigateToRegister()),
// 		setEmail: (text) => dispatch(setEmail(text)),
// 		setPassword: (text) => dispatch(setPassword(text)),
// 		login: (email, password) => dispatch(login(email, password)),
// 	};
//};

export default connect(mapStateToProps, {
	login,
	setEmail,
	setPassword,
	navigateToRegister,
	checkAuthAtStartUp,
})(LoginScreen);
//export default loginForm;
