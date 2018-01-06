import React from 'react';

import { connect } from 'react-redux';

import { Container, Content } from 'native-base';

import { Text } from 'react-native';

class ProfileScreen extends React.Component {
	render() {
		console.log('registerScreen profile this.props: ', this.props);
		return (
			<Container>
				<Content>
					<Text>PROFIILISIVU</Text>
				</Content>
			</Container>
		);
	}
}

export default ProfileScreen;
