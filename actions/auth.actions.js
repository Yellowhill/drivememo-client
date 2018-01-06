import {
	TOGGLE_LOADING,
	LOGIN_SUCCESSFUL,
	REGISTER_SUCCESSFUL,
	SET_EMAIL,
	SET_PASSWORD,
	SET_PASSWORD_CONFIRM,
	UPDATE_USERINFO,
	CLEAR_AUTH_INFO,
} from './actionTypes.js';

import axios from 'axios';

import { NavigationActions } from 'react-navigation';

import { setLoading, updateUserInfo } from './general.actions.js';

const navToAddDrivememo = NavigationActions.navigate({
	routeName: 'AddDrivememo',
});

const navToRegister = NavigationActions.navigate({
	routeName: 'Register',
});

export function setLoginStatus(bool) {
	return {
		type: LOGIN_SUCCESSFUL,
		payload: bool,
	};
}

export function setRegisterStatus(bool) {
	return {
		type: REGISTER_SUCCESSFUL,
		payload: bool,
	};
}

export function setEmail(text) {
	return {
		type: SET_EMAIL,
		payload: text,
	};
}

export function setPassword(text) {
	return {
		type: SET_PASSWORD,
		payload: text,
	};
}

export function setPasswordConfirm(text) {
	return {
		type: SET_PASSWORD_CONFIRM,
		payload: text,
	};
}

export function resetAuthInfo() {
	return {
		type: CLEAR_AUTH_INFO,
	};
}

export function navigateToRegister() {
	return dispatch => dispatch(navToRegister);
}

export function login(email, password) {
	return dispatch => {
		console.log('calling login action creator', email, password);
		dispatch(setLoading(true));

		axios
			.post('http://192.168.1.107:8080/login', {
				email,
				password,
			})
			.then(data => {
				console.log('login data: ', data);
				dispatch(resetAuthInfo());
				dispatch(
					updateUserInfo({
						userEmail: data.email,
					})
				);
				dispatch(navToAddDrivememo);
			})
			.catch(err => {
				console.log('error while login: ', err);
				dispatch(setLoginStatus(false));
				dispatch(setLoading(false));
			});
	};
}

export function register({ email, password, passwordConfirm }) {
	return dispatch => {
		console.log('calling register action creator');
		dispatch(setLoading(true));

		axios
			.post('http://192.168.1.107:8080/register', {
				email,
				password,
				passwordConfirm,
			})
			.then(data => {
				console.log('register data: ', data);
				dispatch(resetAuthInfo());
				dispatch(setRegisterStatus(true));
				dispatch(
					updateUserInfo({
						userEmail: data.email,
					})
				);
				dispatch(navToAddDrivememo);
			})
			.catch(err => {
				console.log('error while register: ', err);
				dispatch(setRegisterStatus(false));
				dispatch(setLoading(false));
			});
	};
}

export function checkAuthAtStartUp() {
	return dispatch => {
		console.log('check checkAuthAtStartUp action called ');
		axios
			.get('http://192.168.1.107:8080/checkauth', { withCredentials: true })
			.then(({ data }) => {
				console.log('checkAuth data+++: ', data);
				dispatch(
					updateUserInfo({
						userEmail: data.email,
					})
				);
				dispatch(navToAddDrivememo);
			})
			.catch(err => {
				console.log('checkauth error: ', err);
				return dispatch({
					type: UPDATE_USERINFO,
					payload: {
						loading: false,
						userEmail: '',
					},
				});
			});
	};
}
