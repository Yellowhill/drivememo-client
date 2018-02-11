import React from 'react';
import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { Container, Content, List, ListItem, Text, Icon, Left, Body } from 'native-base';

import { logout } from '../actions/auth.actions.js';

function SideBar(props) {
	console.log('sidebar props: ', props);
	return (
		<Container>
			<Content style={{ backgroundColor: 'white', paddingTop: 50 }}>
				<List>
					<ListItem icon>
						<Left>
							<Icon name="person" />
						</Left>
						<Body>
							<TouchableOpacity onPress={() => props.navigation.navigate('AddDrivememo')}>
								<Text>Lisää ajomuistio</Text>
							</TouchableOpacity>
						</Body>
					</ListItem>
					<ListItem icon>
						<Left>
							<Icon name="person" />
						</Left>
						<Body>
							<TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
								<Text>Profiili</Text>
							</TouchableOpacity>
						</Body>
					</ListItem>
					<ListItem icon>
						<Left>
							<Icon name="settings" />
						</Left>
						<Body>
							<TouchableOpacity>
								<Text>Asetukset</Text>
							</TouchableOpacity>
						</Body>
					</ListItem>
					<ListItem icon>
						<Left>
							<Icon name="log-out" />
						</Left>
						<Body>
							<TouchableOpacity onPress={props.logout}>
								<Text>Kirjaudu ulos</Text>
							</TouchableOpacity>
						</Body>
					</ListItem>
				</List>
			</Content>
		</Container>
	);
}

const mapStateToProps = ({ authReducer, generalReducer }) => ({
	sideBar: Object.assign({}, authReducer, generalReducer),
});

export default connect(mapStateToProps, { logout })(SideBar);
