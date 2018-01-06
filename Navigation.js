import React from 'react';
import {connect} from 'react-redux';
import LoginScreen from './screens/login.screen.js';
import RegisterScreen from './screens/register.screen.js';
import ProfileScreen from './screens/profile.screen.js';
import AddDrivememoScreen from './screens/addDrivememo.screen.js';
import { 
  StackNavigator, 
  addNavigationHelpers 
} from 'react-navigation';

const routerConfig = {
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen
  },
  AddDrivememo: {
    screen: AddDrivememoScreen
  },
  Profile: {
    screen: ProfileScreen
  }

}

const StackNavigatorConfig = {
  headerMode: 'none',
}

const AppNavigator = StackNavigator(routerConfig, StackNavigatorConfig);
//console.log('AppNavigator---: ', AppNavigator.router.getActionForPathAndParams('Login'));
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));
//console.log('initialState---: ', initialState);

export const navReducer = (state=initialState, action) => {
  //console.log('navReducer state: ', state);
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};


class Navigation extends React.Component {
    render() {
      //console.log('Navigation is rendering')
      return (
        <AppNavigator navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })} />
      );
    }
  }
  
  const mapStateToProps = (state) => {
    //console.log('navigation statetoprops: ', state)
    return {
      nav: state.navReducer
    }

  };
  
  export const NavigationWithState = connect(mapStateToProps)(Navigation);
  