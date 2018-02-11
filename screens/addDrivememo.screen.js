import React from 'react';
import { BackHandler } from 'react-native';
import Drivememo from '../Blocks/Drivememo.js';
import SideBar from '../Blocks/SideBar.js';
import { connect } from 'react-redux';
import moment from 'moment';

import {
	Container,
	Header,
	Content,
	Body,
	Title,
	Spinner,
	Drawer,
	Button,
	Left,
	Icon,
} from 'native-base';

import { setLoading } from '../actions/general.actions.js';
import Styled from 'styled-components/native';
import {
	addDriveAssignment,
	onChangeActiveField,
	onChangeDrivememoField,
	onSubmitDrivememo,
	onChangeDrivememoDateTimeField,
	toggleDriveAssModal,
	invoiceTargetChange,
	invoiceClientInput,
	onResetActiveFields,
	editDriveAss,
	checkDraft,
	toggleDriveAssEdit,
} from '../actions/drivememo.actions.js';

import { StyledTitle } from '../components/index.js';

// const StyledTitle = Styled(Title)`
// 	margin-top: 14px;
// 	margin-left: -54px;
// `;

import ScreenContainerWrapper from '../wrappers/screenContainer.wrapper.js';

class AddDrivememoScreen extends React.Component {
	componentWillMount = () => {
		console.log('AddDrivememoScreen WILL MOUNT');
		this.props.checkDraft();
	};

	componentDidMount() {
		console.log('addDrivememo.screen.js MOUNTED');
		//his.props.setLoading(false);
	}

	componentWillUnmount() {
		console.log('addDrivememo.screen.js UN MOPUUUN');
	}

	handleChangeTextInput = (input) => {
		const { activeDrivememoField } = this.props.addDrivememoScreen;
		this.props.onChangeDrivememoField({
			field: activeDrivememoField,
			input,
		});
	};

	handleDateTimePick = ({ field, dateTimeStr }) => {
		//console.log('this is the before moment datetime: ', dateTimeStr);
		const dateTime = moment(dateTimeStr).format();
		//console.log('this is the moment datetime: ', dateTime);
		this.props.onChangeDrivememoDateTimeField({ field, dateTime });
	};

	handleChangeTab = (tab) => {
		//console.log('handleChangeTab: ', tab.ref.props.name);
		this.props.onChangeActiveField(tab.ref.props.name);
	};

	handleAddDriveAssignment = () => {
		const {
			activeDrivememoField,
			invoiceTarget,
			invoiceClient,
		} = this.props.addDrivememoScreen;

		if (activeDrivememoField === 'invoiceDrive') {
			const invoiceAssObj = {
				entryTime: new Date(),
				assType: activeDrivememoField,
				cost: this.props.addDrivememoScreen[activeDrivememoField],
				invoiceTarget: invoiceTarget,
				invoiceClient: invoiceClient,
			};
			this.props.addDriveAssignment(invoiceAssObj);
		} else {
			const assObj = {
				entryTime: new Date(),
				assType: activeDrivememoField,
				cost: this.props.addDrivememoScreen[activeDrivememoField],
			};
			this.props.addDriveAssignment(assObj);
		}

		this.props.onResetActiveFields();
		this.props.toggleDriveAssModal();
	};

	handleSubmit = () => {
		const {
			roadometerStartValue,
			roadometerEndValue,
		} = this.props.addDrivememoScreen.drivememoInfo;

		console.log('iooooooooo: ', this.props.addDrivememoScreen.drivememoInfo);
		this.props.onSubmitDrivememo(
			Object.assign({}, this.props.addDrivememoScreen.drivememoInfo, {
				totalMileage: roadometerEndValue - roadometerStartValue,
			})
		);
	};
	closeDrawer = () => {
		this.drawer._root.close();
	};

	openDrawer = () => {
		this.drawer._root.open();
	};
	render() {
		console.log('drivememo screen this: ', this);
		return (
			<Container style={{ backgroundColor: 'white' }}>
				<Header>
					<Left style={{ marginTop: 14 }}>
						<Button transparent onPress={() => this.props.onOpenDrawer()}>
							<Icon style={{ fontSize: 34 }} name="menu" />
						</Button>
					</Left>
					<Body>
						<StyledTitle>Ajomuistion lisäys</StyledTitle>
					</Body>
				</Header>
				<Content
					keyboardShouldPersistTaps="always"
					style={{ paddingLeft: 7, paddingRight: 7 }}
				>
					{this.props.addDrivememoScreen.loading ? (
						<Spinner color="black" />
					) : (
						<Drivememo
							{...this.props.addDrivememoScreen}
							onChangeTextInput={this.handleChangeTextInput}
							onDateTimePick={this.handleDateTimePick}
							onSubmit={this.handleSubmit}
							onChangeTab={this.handleChangeTab}
							onAddDriveAssignment={this.handleAddDriveAssignment}
							onChangeActiveField={this.props.onChangeActiveField}
							toggleDriveAssModal={this.props.toggleDriveAssModal}
							toggleDriveAssEdit={this.props.toggleDriveAssEdit}
							editDriveAss={this.props.editDriveAss}
							toggleDrivememoDraft={this.props.toggleDrivememoDraft}
						/>
					)}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ drivememoReducer, generalReducer }) => ({
	addDrivememoScreen: Object.assign({}, drivememoReducer, generalReducer),
});

// const mapDispatchToProps = (dispatch) => {
// 	//console.log('loginscreen dispatch: ', dispatch)
// 	return {
// 		addDriveAssignment: (assObj) => dispatch(addDriveAssignment(assObj)),
// 		onChangeActiveField: (field) => dispatch(onChangeActiveField(field)),
// 		onResetActiveFields: () => dispatch(onResetActiveFields()),
// 		onChangeDrivememoField: (obj) => dispatch(onChangeDrivememoField(obj)),
// 		onInvoiceTargetChange: (value) => dispatch(invoiceTargetChange(value)),
// 		onInvoiceClientInput: (value) => dispatch(invoiceClientInput(value)),
// 		setLoading: (bool) => dispatch(setLoading(bool)),
// 		onSubmitDrivememo: (obj) => dispatch(onSubmitDrivememo(obj)),
// 		onChangeDrivememoDateTimeField: (dateTime) =>
// 			dispatch(onChangeDrivememoDateTimeField(dateTime)),
// 		toggleDriveAssModal: () => dispatch(toggleDriveAssModal()),
// 		editDriveAss: (assInfo) => dispatch(editDriveAss(assInfo)),
// 		toggleDrivememoDraft: () => dispatch({ type: 'TOGGLE_DRIVEMEMO_DRAFT' }),
// 		checkDraft: () => dispatch(checkDraft()),
// 		toggleDriveAssEdit: () => dispatch(toggleDriveAssEdit()),
// 	};
// };

export default connect(mapStateToProps, {
	addDriveAssignment,
	onChangeActiveField,
	onChangeDrivememoField,
	onSubmitDrivememo,
	onChangeDrivememoDateTimeField,
	toggleDriveAssModal,
	invoiceTargetChange,
	invoiceClientInput,
	onResetActiveFields,
	editDriveAss,
	checkDraft,
	toggleDriveAssEdit,
})(ScreenContainerWrapper(AddDrivememoScreen));
