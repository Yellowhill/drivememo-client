import React, { Component } from 'react';
import { Text, View, BackHandler } from 'react-native';
export default class componentName extends Component {
	componentWillMount = () => {
		const navigation = this.props.navigation;

		setTimeout(() => {
			console.log('aaaaaa:', navigation);
			navigation.navigate('Register');
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
