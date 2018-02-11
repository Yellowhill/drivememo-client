import React from 'react';
import { View } from 'react-native';
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

import ScreenContainerWrapper from '../wrappers/screenContainer.wrapper.js';

class ProfileScreen extends React.Component {
	componentDidMount() {
		this.props.setLoading(false);
	}

	// componentWillReceiveProps(nextProps) {
	// 	nextProps.loading && this.props.setLoading(false);
	// }
	render() {
		console.log('profilepage this.props: ', this);

		if (this.props.loading) {
			return <Spinner color="black" />;
		}
		return (
			<Container style={{ backgroundColor: 'white' }}>
				<Header>
					<Left style={{ marginTop: 14 }}>
						<Button transparent onPress={() => this.props.onOpenDrawer()}>
							<Icon style={{ fontSize: 34 }} name="menu" />
						</Button>
					</Left>
					<Body>
						<StyledTitle>Profiili</StyledTitle>
					</Body>
				</Header>
				<Content
					keyboardShouldPersistTaps="always"
					style={{ paddingLeft: 7, paddingRight: 7 }}
				>
					<Separator bordered>
						<Text>Käyttäjätiedot</Text>
					</Separator>
					<ListItem>
						<FormTextInput label="Nimi" />
					</ListItem>
					<ListItem>
						<FormTextInput label="Sähköpostiosoite" />
					</ListItem>
					<ListItem last />
					<Separator bordered>
						<Text>Ajomuistion tiedot</Text>
					</Separator>
					<ListItem>
						<FormTextInput label="Vastaanottajan sähköpostiosoite" />
					</ListItem>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ generalReducer }) => ({
	...generalReducer,
});

export default connect(mapStateToProps, { setLoading })(
	ScreenContainerWrapper(ProfileScreen)
);
