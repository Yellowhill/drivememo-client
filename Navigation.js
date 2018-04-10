import React from 'react';
import { BackHandler } from 'react-native';
import { connect, Provider } from 'react-redux';

import {
	createReduxBoundAddListener,
	createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import {
	StackNavigator,
	addNavigationHelpers,
	NavigationActions,
} from 'react-navigation';

import SplashScreen from './screens/Splash.screen.js';
import LoginScreen from './screens/Login.screen.js';
import RegisterScreen from './screens/Register.screen.js';
import PostRegister from './screens/PostRegister.screen.js';
import ProfileScreen from './screens/Profile.screen.js';
import AddDrivememoScreen from './screens/AddDrivememo.screen.js';

import { StyleProvider } from 'native-base';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import ScreenContainerWrapper from './wrappers/screenContainer.wrapper.js';

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
	PostRegister: {
		screen: PostRegister,
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

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const navMiddleware = createReactNavigationReduxMiddleware(
	'root',
	(state) => state.nav
);
const addListener = createReduxBoundAddListener('root');

export default class Navigation extends React.Component {
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
		console.log('Navigation is rendering', this);
		return (
			<StyleProvider style={getTheme(material)}>
				<AppNavigator
					navigation={addNavigationHelpers({
						dispatch: this.props.dispatch,
						state: this.props.nav,
						addListener,
					})}
					screenProps={{
						onOpenDrawer: this.props.onOpenDrawer,
					}}
				/>
			</StyleProvider>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		nav: state.navReducer,
	};
};

export const NavigationWithState = connect(mapStateToProps)(
	ScreenContainerWrapper(Navigation)
);
