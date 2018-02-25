import React from 'react';
import { BackHandler } from 'react-native';
import PostRegisterForm from '../Blocks/PostRegisterForm.js';

import { connect } from 'react-redux';

import {
	setUserName,
	setDrivememoReceiverEmail,
	saveUserInfo,
} from '../actions/user.actions.js';
import { setLoading } from '../actions/general.actions.js';
import {
	Container,
	Header,
	Content,
	Body,
	Spinner,
	Button,
	Left,
	Icon,
	Separator,
	ListItem,
	Text,
	Title,
} from 'native-base';

import { StyledTitle, FormTextInput } from '../components/index.js';

class PostRegisterScreen extends React.Component {
	componentWillMount = () => {
		console.log('postRegister will mount', this);
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
		this.props.setUserName(name.trim());
	};

	handleDriveMemoReceiverChange = (receiverEmail) => {
		//TODO password validation here
		this.props.setDrivememoReceiverEmail(receiverEmail.trim().toLowerCase());
	};

	handleSubmit = () => {
		const { userName, receiverEmail } = this.props;
		console.log('handle submit muistion tiedot:', userName, receiverEmail);
		this.props.saveUserInfo({
			name: userName,
			email: receiverEmail,
		});
	};

	render() {
		console.log('postRegisterScreen render this.props: ', this);
		return (
			<Container>
				<Header>
					<Body>
						<Title style={{ marginTop: 14 }}>Muistion tiedot</Title>
					</Body>
				</Header>
				<Content>
					{this.props.loading ? (
						<Spinner color="black" />
					) : (
						<PostRegisterForm
							onDriverNameChange={this.handleDriverNameChange}
							onDriveMemoReceiverChange={this.handleDriveMemoReceiverChange}
							btnText="Tallenna"
							onSubmit={this.handleSubmit}
						/>
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
	setUserName,
	setDrivememoReceiverEmail,
	saveUserInfo,
	setLoading,
})(PostRegisterScreen);
