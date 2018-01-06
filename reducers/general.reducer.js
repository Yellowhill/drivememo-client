import { TOGGLE_LOADING, UPDATE_USERINFO } from '../actions/actionTypes.js';

const initialState = {
	loading: true,
	userEmail: '',
	userName: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_LOADING:
			return {
				...state,
				loading: !state.loading,
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
