import {
	SET_DRIVER_NAME,
	SET_RECEIVER_EMAIL,
	UPDATE_USERINFO,
} from '../actions/actionTypes.js';

const initialState = {
	receiverEmail: '',
	userEmail: '',
	userName: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_DRIVER_NAME:
			return {
				...state,
				userName: action.payload,
			};
		case SET_RECEIVER_EMAIL:
			return {
				...state,
				receiverEmail: action.payload,
			};
		case UPDATE_USERINFO:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
