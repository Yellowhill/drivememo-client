import React from 'react';
import { View } from 'react-native';
import {
	Container,
	Header,
	Content,
	Body,
	Spinner,
	Text,
	Title,
	Button,
	Icon,
} from 'native-base';
import { BackHandler } from 'react-native';
import PostRegisterForm from '../Blocks/PostRegisterForm.js';

import { connect } from 'react-redux';

import { updateSessionUserInfo, saveUserInfo } from '../actions/user.actions.js';
import { setLoading } from '../actions/general.actions.js';
import { navToAddDrivememo } from '../actions/navigation.actions.js';

import {
	StyledTitle,
	FormTextInput,
	PostRegisterSkipButton,
} from '../components/index.js';

class PostRegisterScreen extends React.Component {
	componentWillMount = () => {
		console.log('postRegister will mount', this);
		console.log('postRegister will navToAddDrivememo', navToAddDrivememo);
		// const navigation = this.props.navigation;
		// const that = this;
		// BackHandler.addEventListener('hardwareBackPress', function() {
		// 	console.log('RegisterScreen RegisterScreen', that);
		// 	navigation.goBack();
		// 	return true;
		// });
	};

	componentDidMount = () => {
		this.props.setLoading(false);
	};

	handleDriverNameChange = (name) => {
		//TODO name validation here
		this.props.updateSessionUserInfo({ userName: name.trim() });
	};

	handleDriveMemoReceiverChange = (receiverEmail) => {
		//TODO password validation here
		this.props.updateSessionUserInfo({
			receiverEmail: receiverEmail.trim().toLowerCase(),
		});
	};

	handleSubmit = () => {
		const { userName, receiverEmail } = this.props;
		console.log('handle submit muistion tiedot:', userName, receiverEmail);
		this.props.saveUserInfo({
			name: userName,
			email: receiverEmail,
		});
	};

	handleSkipScreen = () => {
		//this.props.navToAddDrivememo();
		this.props.navigation.navigate('AddDrivememo');
	};
	render() {
		console.log('postRegisterScreen render this.props: ', this);
		return (
			<Container>
				<Header>
					<Body>
						<Title style={{ marginTop: 14 }}>Profiilin lisätiedot</Title>
					</Body>
				</Header>
				<Content>
					{this.props.loading ? (
						<Spinner color="black" />
					) : (
						<View>
							<PostRegisterForm
								onDriverNameChange={this.handleDriverNameChange}
								onDriveMemoReceiverChange={this.handleDriveMemoReceiverChange}
								btnText="Tallenna"
								onSubmit={this.handleSubmit}
							/>
							<PostRegisterSkipButton onPress={this.handleSkipScreen} />
						</View>
					)}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ userReducer, generalReducer }) => ({
	...userReducer,
	...generalReducer,
});

export default connect(mapStateToProps, {
	updateSessionUserInfo,
	saveUserInfo,
	setLoading,
	navToAddDrivememo,
})(PostRegisterScreen);
