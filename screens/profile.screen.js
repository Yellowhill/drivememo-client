import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

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
} from 'native-base';

import { StyledTitle, FormTextInput } from '../components/index.js';

import { setLoading } from '../actions/general.actions.js';
import { saveUserInfo, updateSessionUserInfo } from '../actions/user.actions.js';

class ProfileScreen extends React.Component {
	state = {
		userEmail: '',
		userName: '',
		receiverEmail: '',
	};

	componentWillMount() {
		console.log('PROFILE SCREEN WILL MOUTN');
	}

	componentWillUnMount() {
		console.log('PROFILE SCREEN WILL UN----MOUTN');
	}

	componentDidMount() {
		const { userEmail, userName, receiverEmail } = this.props;

		this.setState({
			stateUserEmail: userEmail,
			stateUserName: userName,
			stateReceiverEmail: receiverEmail,
		});

		this.props.setLoading(false);
	}

	handleUpdateUserInfo = () => {
		console.log('handleUpdateUserInfo: ');
		const { userEmail, userName, receiverEmail, saveUserInfo } = this.props;

		if (userEmail && userName && receiverEmail) {
			saveUserInfo({
				email: userEmail,
				name: userName,
				receiverEmail,
			});
		}

		console.log('cant be empty');
	};

	render() {
		console.log('profilepage _render_ this.props: ', this);
		const { userEmail, userName, receiverEmail } = this.props;
		const { stateUserEmail, stateUserName, stateReceiverEmail } = this.state;

		const enableSave =
			userEmail !== stateUserEmail ||
			userName !== stateUserName ||
			receiverEmail !== stateReceiverEmail;

		return (
			<Container style={{ backgroundColor: 'white' }}>
				<Header>
					<Left style={{ marginTop: 18 }}>
						<Button transparent onPress={() => this.props.screenProps.onOpenDrawer()}>
							<Icon style={{ fontSize: 34 }} name="menu" />
						</Button>
					</Left>
					<Body>
						<StyledTitle>Profiili</StyledTitle>
					</Body>
				</Header>
				{this.props.loading ? (
					<Spinner color="black" />
				) : (
					<Content
						keyboardShouldPersistTaps="always"
						style={{ paddingLeft: 0, paddingRight: 0 }}
					>
						<Separator bordered>
							<Text>Käyttäjätiedot</Text>
						</Separator>
						<View style={{ paddingLeft: 7, paddingRight: 7, marginBottom: 14 }}>
							<FormTextInput
								labelText="Nimi"
								value={this.props.userName}
								onChangeText={(value) =>
									this.props.updateSessionUserInfo({ userName: value })
								}
							/>

							<FormTextInput
								labelText="Sähköpostiosoite"
								value={this.props.userEmail}
								onChangeText={(value) =>
									this.props.updateSessionUserInfo({ userEmail: value })
								}
							/>
						</View>

						<ListItem last />
						<Separator bordered>
							<Text>Ajomuistion tiedot</Text>
						</Separator>
						<View style={{ paddingLeft: 7, paddingRight: 7 }}>
							<FormTextInput
								labelText="Vastaanottajan sähköpostiosoite"
								value={this.props.receiverEmail}
								onChangeText={(value) =>
									this.props.updateSessionUserInfo({ receiverEmail: value })
								}
							/>
						</View>
						<View style={{ marginTop: 42, marginBottom: 42 }}>
							<TouchableOpacity>
								<Button block disabled={!enableSave} onPress={this.handleUpdateUserInfo}>
									<Text> Tallenna </Text>
								</Button>
							</TouchableOpacity>
						</View>
					</Content>
				)}
			</Container>
		);
	}
}

const mapStateToProps = ({ generalReducer, userReducer }) => ({
	...generalReducer,
	...userReducer,
});

export default connect(mapStateToProps, {
	setLoading,
	saveUserInfo,
	updateSessionUserInfo,
})(ProfileScreen);
