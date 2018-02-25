import { TOGGLE_LOADING, UPDATE_USERINFO } from '../actions/actionTypes.js';

const initialState = {
	loading: true,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_LOADING:
			return {
				...state,
				loading: !state.loading,
			};
		default:
			return state;
	}
};
