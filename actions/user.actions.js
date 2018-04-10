import axios from 'axios';

import { apiUrl } from '../variables.js';
import { UPDATE_USERINFO } from './actionTypes.js';
import { setLoading } from './general.actions.js';

import { navToAddDrivememo } from './navigation.actions.js';

export function updateSessionUserInfo(user) {
	return {
		type: UPDATE_USERINFO,
		payload: user,
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
					updateSessionUserInfo({
						receiverEmail: receiverEmail,
						userEmail: email,
						userName: name,
					})
				);
				dispatch(setLoading(false));
				//dispatch(navToAddDrivememo);
			})
			.catch((error) => {
				console.log('Error while updating user info: ', error);
				dispatch(setLoading(false));
			});
	};
}
