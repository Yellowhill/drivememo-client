import React, { Component } from 'react';
import { Text, View, BackHandler } from 'react-native';
export default class componentName extends Component {
	componentWillMount = () => {
		const navigation = this.props.navigation;

		setTimeout(() => {
			console.log('navivation:', navigation);
			navigation.navigate('PostRegister');
		}, 500);
	};

	render() {
		return (
			<View>
				<Text>AJOMUISTIO</Text>
			</View>
		);
	}
}
