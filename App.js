import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { StyleProvider } from 'native-base';
import { Provider } from 'react-redux';

import { NavigationWithState } from './Navigation.js';
//console.log('this be the navigation with state: ', NavigationWithState)
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

import thunk from 'redux-thunk';

import { createLogger } from 'redux-logger';

import RootReducer from './reducers/index.reducer.js';

import Drivememo from './Blocks/Drivememo.js';

import LoginScreen from './screens/Login.screen.js';

import { navMiddleware } from './Navigation.js';
import { composeWithDevTools } from 'redux-devtools-extension';
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

// function confStore(initialState) {
//   const enhancer = compose(
//     applyMiddleware(
//       Thunk,
//       loggerMiddleware
//     )
//   );
//   return createStore(RootReducer, initialState, enhancer);
// }

const store = createStore(
	RootReducer,
	composeWithDevTools(applyMiddleware(navMiddleware, thunk, loggerMiddleware))
);

export default class App extends React.Component {
	state = {
		loading: true,
	};

	loadFonts = async () => {
		await Expo.Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
		});
	};
	render() {
		return (
			<Provider store={store}>
				{this.state.loading ? (
					<AppLoading
						startAsync={this.loadFonts}
						onFinish={() => this.setState({ loading: false })}
						onError={console.warn}
					/>
				) : (
					<NavigationWithState />
				)}
			</Provider>
		);
	}
}

/**
 *         <View style={styles.container}>
          {this.state.loading
            ? (<Text>loading</Text>)
            : (<LoginScreen />)}
        </View>
 */
