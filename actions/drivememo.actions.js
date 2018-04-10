import { apiUrl } from '../variables.js';
import axios from 'axios';

import {
	ADD_DRIVE_ASSIGNMENT,
	SET_ACTIVE_FIELD,
	SET_DRIVEMEMO_INPUT,
	SUBMIT_DRIVEMEMO,
	SET_DRIVEMEMO_DATETIME,
	TOGGLE_DRIVEASS_MODAL,
	CHANGE_INVOICE_TARGET,
	CHANGE_INVOICE_CLIENT,
	RESET_ACTIVEFIELD_INFO,
	TOGGLE_DRIVEASS_EDIT,
	DRIVEASS_EDIT_TARGET,
	UPDATE_EDIT_TARGET,
	SAVE_DRIVEASS_EDIT,
	DELETE_DRIVEASS,
	DRIVEMEMO_UPDATE,
	TOGGLE_DRIVEMEMO_DRAFT,
} from './actionTypes.js';

import { setLoading } from './general.actions.js';

export function addDriveAssignment(assObj) {
	//	console.log('addDriveAssignment action', assObj);
	return {
		type: ADD_DRIVE_ASSIGNMENT,
		payload: assObj,
	};
}

export function onChangeActiveField(field) {
	//	console.log('field in action: ', field);
	return {
		type: SET_ACTIVE_FIELD,
		payload: field,
	};
}

export function toggleDrivememoDraft() {
	return {
		type: TOGGLE_DRIVEMEMO_DRAFT,
	};
}

export function onChangeDrivememoField({ field, input }) {
	return {
		type: SET_DRIVEMEMO_INPUT,
		payload: {
			field,
			input,
		},
	};
}

export function onChangeDrivememoDateTimeField({ field, dateTime }) {
	//console.log('onChangeDrivememoDateTimeField action: ', field);
	return {
		type: SET_DRIVEMEMO_DATETIME,
		payload: {
			field,
			dateTime,
		},
	};
}

export function toggleDriveAssModal() {
	return {
		type: TOGGLE_DRIVEASS_MODAL,
	};
}

export function invoiceTargetChange(str) {
	return {
		type: CHANGE_INVOICE_TARGET,
		payload: str,
	};
}

export function invoiceClientInput(str) {
	return {
		type: CHANGE_INVOICE_CLIENT,
		payload: str,
	};
}

export function onResetActiveFields() {
	return {
		type: RESET_ACTIVEFIELD_INFO,
	};
}

export function toggleDriveAssEdit() {
	return {
		type: TOGGLE_DRIVEASS_EDIT,
	};
}

export function driveAssEditTarget(assInfo) {
	return {
		type: DRIVEASS_EDIT_TARGET,
		payload: assInfo,
	};
}

export function editDriveAss(assInfo) {
	//console.log('assinfo: ', assInfo);
	return (dispatch) => {
		dispatch(toggleDriveAssEdit());
		dispatch(driveAssEditTarget(assInfo));
	};
}

export function updateEditTarget(value, field) {
	//console.log('updateEditTarget ', value, field);
	return {
		type: UPDATE_EDIT_TARGET,
		payload: { value, field },
	};
}

export const saveDriveAssEdit = (target) => {
	//console.log('saveDriveAssEdit target: ', target);
	return {
		type: SAVE_DRIVEASS_EDIT,
		payload: target,
	};
};

export const deleteDriveAss = (target) => {
	return {
		type: DELETE_DRIVEASS,
		payload: target,
	};
};

export function checkDraft() {
	return (dispatch) => {
		//dispatch(setLoading(true));
		axios
			.get(`${apiUrl}/checkdraft`)
			.then(({ data }) => {
				console.log('this is the data from checkdraft: ', data);
				if (data.length > 0) {
					dispatch({
						type: DRIVEMEMO_UPDATE,
						payload: data[0],
					});
				}
			})
			.catch((err) => console.log('Error in checkdraft: ', err))
			.then(() => dispatch(setLoading(false)));
	};
}

export function onSubmitDrivememo(drivememo) {
	return (dispatch) => {
		dispatch(setLoading(true));
		axios
			.post(`${apiUrl}/adddrivememo`, {
				drivememo,
			})
			.then(({ data }) => {
				console.log('axios res---------: ', data);
				if (!data.draft) {
					dispatch({
						type: DRIVEMEMO_UPDATE,
						payload: {
							draft: true,
							driveAssignments: [],
						},
					});
				} else {
					dispatch({
						type: DRIVEMEMO_UPDATE,
						payload: data,
					});
				}
			})
			.catch((err) => {
				console.log('Error while submit: ', err);
			})
			.then(() => dispatch(setLoading(false)));
	};
}
