import {
	navToAddDrivememo,
	navToRegister,
	navToPostRegister,
	navToLogin,
	navToProfile,
} from './navigation.actions.js';

export const navigateToProfile = () => {
	console.log('navigateToProfile in sidebar.actions');
	return (dispatch) => {
		dispatch(navToProfile);
	};
};

export const navigateToAddDrivememo = () => {
	return (dispatch) => {
		dispatch(navToAddDrivememo);
	};
};
