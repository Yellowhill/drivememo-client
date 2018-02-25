import axios from 'axios';

import { apiUrl } from '../variables.js';
import { SET_DRIVER_NAME, SET_RECEIVER_EMAIL, UPDATE_USERINFO } from './actionTypes.js';
import { setLoading } from './general.actions.js';

import { navToAddDrivememo } from './navigation.actions.js';

export function setUserName(text) {
	return {
		type: SET_DRIVER_NAME,
		payload: text,
	};
}

export function setDrivememoReceiverEmail(text) {
	console.log('setDrivememoReceiverEmail: ', text);
	return {
		type: SET_RECEIVER_EMAIL,
		payload: text,
	};
}

export function saveUserInfo(user) {
	return (dispatch) => {
		dispatch(setLoading(true));
		console.log('this is user from savesuser: ', user);
		axios
			.post(`${apiUrl}/updateuserinfo`, user)
			.then(({ data }) => {
				console.log('data from saveuserInfo: ', data);
				const { name, receiverEmail, email } = data;
				dispatch(
					updateUserInfo({
						receiverEmail: receiverEmail,
						userEmail: email,
						userName: name,
					})
				);
				dispatch(navToAddDrivememo);
			})
			.catch((error) => {
				console.log('Error while updating user info: ', error);
				dispatch(setLoading(false));
			});
	};
}

export function updateUserInfo(user) {
	return {
		type: UPDATE_USERINFO,
		payload: user,
	};
}
