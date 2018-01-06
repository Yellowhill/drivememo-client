import {
	ADD_DRIVE_ASSIGNMENT,
	SET_DRIVEMEMO_INPUT,
	SET_ACTIVE_FIELD,
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
	TOGGLE_DRIVEMEMO_DRAFT,
	DRIVEMEMO_UPDATE,
} from '../actions/actionTypes.js';

const initialState = {
	showDriveAssModal: false,
	invoiceTarget: 'Kela',
	invoiceClient: '',
	activeDrivememoField: '',
	driveAssEditTarget: {},
	driveAssEditModal: false,
	drivememoInfo: {
		// cardDrives: [],
		// cashDrives: [],
		// invoiceDrives: [],
		// cardDrive:null,
		// cashDrive:null,
		// invoiceDrive: null,
		// invoiceTarget: null,
		// invoiceClient: null,
		draft: true,
		driveAssignments: [],
	},
};

const drivememo = (state = initialState, action) => {
	console.log('drivememo reducers action: ', action);
	switch (action.type) {
		case DRIVEMEMO_UPDATE: {
			console.log('this is the payload++++++++++: ', action.payload);
			return {
				...state,
				drivememoInfo: action.payload,
				// drivememoInfo: Object.assign({}, ...state.drivememoInfo, {
				// 	...action.payload,
				// }),
			};
		}
		case ADD_DRIVE_ASSIGNMENT:
			const { assType } = action.payload;
			const assCost = state.drivememoInfo[assType];

			// console.log('assType: ', assType);
			// console.log('state.drivememoInfo[assType]', state.drivememoInfo[assType]);
			return {
				...state,
				drivememoInfo: {
					...state.drivememoInfo,
					[assType]: null,
					driveAssignments: state.drivememoInfo.driveAssignments.concat({
						...action.payload,
						cost: assCost, //state.drivememoInfo[assType],
					}),
				},
			};

		case SET_ACTIVE_FIELD:
			console.log('in reducer SET_ACTIVE_FIELD: ', action.payload);
			return {
				...state,
				activeDrivememoField: action.payload,
			};

		case RESET_ACTIVEFIELD_INFO:
			return {
				...state,
				invoiceClient: '',
				cardDrive: '',
				cashDrive: '',
				invoiceDrive: '',
				activeDrivememoField: '',
			};

		case SET_DRIVEMEMO_INPUT:
			return {
				...state,
				drivememoInfo: {
					...state.drivememoInfo,
					[action.payload.field]: action.payload.input,
				},
			};

		case SET_DRIVEMEMO_DATETIME:
			return {
				...state,
				drivememoInfo: {
					...state.drivememoInfo,
					[action.payload.field]: action.payload.dateTime,
				},
			};
		case TOGGLE_DRIVEASS_MODAL:
			return {
				...state,
				showDriveAssModal: !state.showDriveAssModal,
			};
		case CHANGE_INVOICE_TARGET:
			return {
				...state,
				invoiceTarget: action.payload,
			};
		case CHANGE_INVOICE_CLIENT:
			return {
				...state,
				invoiceClient: action.payload,
			};
		case TOGGLE_DRIVEASS_EDIT:
			return {
				...state,
				driveAssEditModal: !state.driveAssEditModal,
			};
		case DRIVEASS_EDIT_TARGET: {
			return {
				...state,
				driveAssEditTarget: action.payload,
			};
		}
		case UPDATE_EDIT_TARGET: {
			const { value, field } = action.payload;
			return {
				...state,
				driveAssEditTarget: Object.assign({}, state.driveAssEditTarget, {
					[field]: value,
				}),
			};
		}

		case SAVE_DRIVEASS_EDIT: {
			const updatedAssArray = state.drivememoInfo.driveAssignments.map((ass, i) => {
				if (i === action.payload.index) {
					return action.payload;
				}
				return ass;
			});

			return {
				...state,
				driveAssEditModal: !state.driveAssEditModal,
				drivememoInfo: {
					...state.drivememoInfo,
					driveAssignments: updatedAssArray,
				},
			};
		}

		case DELETE_DRIVEASS: {
			const updatedAssArray = state.drivememoInfo.driveAssignments.filter((ass, i) => {
				return i !== action.payload.index;
			});
			return {
				...state,
				driveAssEditModal: !state.driveAssEditModal,
				drivememoInfo: {
					...state.drivememoInfo,
					driveAssignments: updatedAssArray,
				},
			};
		}

		case TOGGLE_DRIVEMEMO_DRAFT: {
			return {
				...state,
				drivememoInfo: {
					...state.drivememoInfo,
					draft: !state.drivememoInfo.draft,
				},
			};
		}

		default:
			return state;
	}
};

export default drivememo;
