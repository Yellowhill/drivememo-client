import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from './screens/splash.screen.js';
import LoginScreen from './screens/login.screen.js';
import RegisterScreen from './screens/register.screen.js';
import ProfileScreen from './screens/profile.screen.js';
import AddDrivememoScreen from './screens/addDrivememo.screen.js';
import {
	StackNavigator,
	addNavigationHelpers,
	NavigationActions,
} from 'react-navigation';

import { StyleProvider } from 'native-base';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

const routerConfig = {
	Splash: {
		screen: SplashScreen,
	},

	Login: {
		screen: LoginScreen,
	},
	Register: {
		screen: RegisterScreen,
	},
	AddDrivememo: {
		screen: AddDrivememoScreen,
	},
	Profile: {
		screen: ProfileScreen,
	},
};

const StackNavigatorConfig = {
	headerMode: 'none',
};

const AppNavigator = StackNavigator(routerConfig, StackNavigatorConfig);
//console.log('AppNavigator---: ', AppNavigator.router.getActionForPathAndParams('Login'));
const initialState = AppNavigator.router.getStateForAction(
	AppNavigator.router.getActionForPathAndParams('Splash')
);

export const navReducer = (state = initialState, action) => {
	//console.log('navReducer state: ', state);
	const nextState = AppNavigator.router.getStateForAction(action, state);

	// Simply return the original `state` if `nextState` is null or undefined.
	return nextState || state;
};

class Navigation extends React.Component {
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
	}
	onBackPress = () => {
		const { dispatch, nav } = this.props;
		const isAddDrivememoScreen =
			nav.routes[nav.routes.length - 1].routeName === 'AddDrivememo';
		if (nav.index === 1 || isAddDrivememoScreen) {
			return false;
		}
		dispatch(NavigationActions.back());
		return true;
	};

	render() {
		//console.log('Navigation is rendering')
		return (
			<StyleProvider style={getTheme(material)}>
				<AppNavigator
					navigation={addNavigationHelpers({
						dispatch: this.props.dispatch,
						state: this.props.nav,
					})}
				/>
			</StyleProvider>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log('navigation statetoprops: ', state)
	return {
		nav: state.navReducer,
	};
};

export const NavigationWithState = connect(mapStateToProps)(Navigation);
