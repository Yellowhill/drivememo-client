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
} from '../components/index.js';

function Drivememo(props) {
	console.log('drivememo block props+++:', props);

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
		<View>
			<KeyboardAvoidingView keyboardShouldPersistTaps={'handled'}>
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
					labelText="Kilometrejä yhteensä ajovuorossa"
					keyboardType="numeric"
					editable={false}
					value={totalMileage && totalMileage.toString()}
					onChangeText={props.onChangeTextInput}
					onFocus={() => onChangeActiveField('totalMileage')}
				/>

				<DriveAssList
					driveAssignments={driveAssignments}
					onRowPress={props.editDriveAss}
				/>
			</KeyboardAvoidingView>
			<View style={{ marginTop: 24 }}>
				<S_BlockButton
					onPress={props.toggleDriveAssModal}
					text="Lisää merkintä"
					accessibilityLabel="Lisää uusi merkintä ajomuistioon"
				/>
				<DraftCheckbox
					draft={props.drivememoInfo.draft}
					onPress={props.toggleDrivememoDraft}
				/>
				<S_BlockButton
					onPress={props.onSubmit}
					text={`${
						props.drivememoInfo.draft ? 'Tallenna luonnos' : 'Tallenna ja lähetä'
					}`}
					accessibilityLabel="Tallenna ajomuistio"
				/>
			</View>

			<DriveAssEditModal
				visible={props.driveAssEditModal}
				onRequestClose={() => console.log('turha')}
				transparent={false}
				animationType="slide"
			/>

			<DriveAssignmentModal
				visible={props.showDriveAssModal}
				onRequestClose={() => console.log('turha')}
				transparent={false}
				animationType="slide"
				onAddDriveAssignment={props.onAddDriveAssignment}
				onChangeTab={props.onChangeTab}
				onChangeTextInput={props.onChangeTextInput}
			/>
		</View>
	);
}

export default Drivememo;
