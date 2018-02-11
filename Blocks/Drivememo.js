//https://stackoverflow.com/questions/35905988/react-js-how-to-append-a-component-on-click
import React from 'react';

import { View, KeyboardAvoidingView, ScrollView } from 'react-native';

import moment from 'moment';

import DriveAssignmentModal from './DriveAssignmentModal.js';

import DriveAssEditModal from './DriveAssEditModal.js';

import {
	FormTextInput,
	FormRow,
	DateTimePicker,
	S_BlockButton,
	DriveAssList,
	DraftCheckbox,
	TotalMileage,
} from '../components/index.js';

import { Button, Icon, Text } from 'native-base';

function Drivememo(props) {
	// console.log('drivememo block props+++:', props);

	const { onChangeActiveField, onChangeTextInput, onDateTimePick } = props;

	const {
		roadometerStartValue,
		roadometerEndValue,
		driveStartDate,
		driveEndDate,
		driveAssignments,
	} = props.drivememoInfo;

	const totalMileage =
		roadometerEndValue && roadometerStartValue
			? roadometerEndValue - roadometerStartValue
			: '';

	return (
		<KeyboardAvoidingView
			keyboardShouldPersistTaps={'handled'}
			behavior="padding"
			style={{ paddingBottom: 50 }}
		>
			<DateTimePicker
				label="Ajovuoro alkoi"
				onDateTimePick={onDateTimePick}
				name="driveStartDate"
				value={driveStartDate && moment(driveStartDate).format('DD.MM.YYYY HH.mm')}
			/>
			<DateTimePicker
				label="Ajovuoro päättyi"
				onDateTimePick={onDateTimePick}
				name="driveEndDate"
				value={driveEndDate && moment(driveEndDate).format('DD.MM.YYYY HH.mm')}
			/>
			<FormTextInput
				labelText="Matkamittarin lukema ajovuoron alussa"
				keyboardType="numeric"
				onChangeText={props.onChangeTextInput}
				onFocus={() => onChangeActiveField('roadometerStartValue')}
			/>
			<FormTextInput
				labelText="Matkamittarin lukema ajovuoron lopussa"
				keyboardType="numeric"
				onChangeText={props.onChangeTextInput}
				onFocus={() => onChangeActiveField('roadometerEndValue')}
			/>
			<FormTextInput
				labelText="Ammattiajoa"
				keyboardType="numeric"
				onChangeText={props.onChangeTextInput}
				onFocus={() => onChangeActiveField('workRelatedDriving')}
			/>
			<FormTextInput
				labelText="Tuloa tuottamaton ammattiajo"
				keyboardType="numeric"
				onChangeText={props.onChangeTextInput}
				onFocus={() => onChangeActiveField('workRelatedDrivingNoPay')}
			/>
			<FormTextInput
				disabled
				labelText="Kilometrejä yhteensä ajovuorossa"
				value={`${totalMileage && totalMileage.toString()} ${totalMileage && 'km'}`}
			/>
			{/* <View style={{ marginBottom: 21, marginTop: 14 }}>
					<TotalMileage totalMileage={totalMileage} />
				</View> */}

			<DriveAssList
				driveAssignments={driveAssignments}
				onRowPress={props.editDriveAss}
				toggleDriveAssModal={props.toggleDriveAssModal}
			/>

			<View style={{ marginTop: 14 }}>
				<View style={{ marginBottom: 21 }}>
					<DraftCheckbox
						draft={props.drivememoInfo.draft}
						onPress={props.toggleDrivememoDraft}
					/>
				</View>
				<S_BlockButton
					block
					bordered={props.drivememoInfo.draft}
					onPress={props.onSubmit}
					text={`${
						props.drivememoInfo.draft ? 'Tallenna luonnos' : 'Tallenna ja lähetä'
					}`}
					accessibilityLabel="Tallenna ajomuistio"
				/>
			</View>

			<DriveAssEditModal
				visible={props.driveAssEditModal}
				onRequestClose={() => props.toggleDriveAssEdit()}
				transparent={false}
				animationType="slide"
			/>

			<DriveAssignmentModal
				visible={props.showDriveAssModal}
				onRequestClose={() => props.toggleDriveAssModal()}
				transparent={false}
				animationType="slide"
				onAddDriveAssignment={props.onAddDriveAssignment}
				onChangeTab={props.onChangeTab}
				onChangeTextInput={props.onChangeTextInput}
			/>
		</KeyboardAvoidingView>
	);
}

export default Drivememo;
