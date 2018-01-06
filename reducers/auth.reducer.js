import {
	CHECK_AUTHENTICATION,
	SET_EMAIL,
	SET_PASSWORD,
	SET_PASSWORD_CONFIRM,
	LOGIN_SUCCESSFUL,
	REGISTER_SUCCESSFUL,
	TOGGLE_SHOW_PASSWORD,
	CLEAR_AUTH_INFO,
} from '../actions/actionTypes.js';

const initialState = {
	authenticated: false,
	showPassword: false,
};
export default (state = initialState, action) => {
	switch (action.type) {
		case CHECK_AUTHENTICATION:
			return {
				...state,
				authenticated: action.payload,
			};

		case SET_EMAIL:
			return {
				...state,
				email: action.payload,
			};

		case SET_PASSWORD:
			return {
				...state,
				password: action.payload,
			};

		case SET_PASSWORD_CONFIRM:
			return {
				...state,
				passwordConfirm: action.payload,
			};

		case LOGIN_SUCCESSFUL:
			return {
				...state,
				loginSuccessful: action.payload,
			};

		case REGISTER_SUCCESSFUL:
			return {
				...state,
				registerSuccessful: action.payload,
			};

		case TOGGLE_SHOW_PASSWORD:
			return {
				...state,
				showPassword: !state.showPassword,
			};

		case CLEAR_AUTH_INFO:
			return {
				...state,
				email: '',
				password: '',
			};
		default:
			return state;
	}
};
