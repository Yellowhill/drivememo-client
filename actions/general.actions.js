import { TOGGLE_LOADING } from './actionTypes.js';

export function setLoading(bool) {
	return {
		type: TOGGLE_LOADING,
		payload: bool,
	};
}
