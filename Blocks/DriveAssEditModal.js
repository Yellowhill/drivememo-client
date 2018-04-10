import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { Modal, View, ScrollView, KeyboardAvoidingView } from 'react-native';

import { connect } from 'react-redux';

import {
	Container,
	Header,
	Title,
	Content,
	Footer,
	FooterTab,
	Button,
	Left,
	Right,
	Body,
	Icon,
	Text,
	Picker,
	Item,
} from 'native-base';

import { FormTextInput } from '../components/index.js';
import {
	updateEditTarget,
	toggleDriveAssEdit,
	saveDriveAssEdit,
	deleteDriveAss,
} from '../actions/drivememo.actions.js';

const StyledModal = styled.Modal``;

const ButtonContainer = styled.View`
	height: 60px;
	flex-direction: row-reverse;
`;

const PickerContainer = styled(Picker)``;

const PickerHeader = styled(Text)`
	color: gray;
	padding-top: 7px;
	position: relative;
	bottom: -3px;
`;

const FlexButton = styled(Button)`
	margin: 7px;
`;

const StyledScrollView = styled.ScrollView`
	padding-left: 7px;
	padding-right: 7px;
`;

function DriveAssignmentModal({
	animationType,
	transparent,
	visible,
	onRequestClose,
	updateEditTarget,
	saveDriveAssEdit,
	deleteDriveAss,
	toggleDriveAssEdit,
	addDrivememoScreen,
}) {
	//console.log('driveAssEditTarget in modal: ', addDrivememoScreen);
	const { driveAssEditTarget } = addDrivememoScreen;

	return (
		<StyledModal
			animationType={animationType}
			transparent={transparent}
			visible={visible}
			onRequestClose={onRequestClose}
			keyboardShouldPersistTaps="always"
			keyboardDismissMode="on-drag"
		>
			<Container>
				<Header>
					<Body>
						<Title>Ajotapahtuman muokkaus</Title>
					</Body>
				</Header>
				<Content keyboardShouldPersistTaps="always">
					<StyledScrollView>
						<KeyboardAvoidingView
							behavior="position"
							contentContainerStyle={{
								paddingTop: -50,
							}}
						>
							<Text>
								{moment(driveAssEditTarget.entryTime).format('DD.MM.YYYY hh.mm')}
								{driveAssEditTarget.assType === 'cardDrive'
									? ' Korttiajo'
									: driveAssEditTarget.assType === 'cashDrive'
										? ' Käteisajo'
										: ' Laskutettava'}
							</Text>
							{driveAssEditTarget.assType === 'invoiceDrive' && (
								<View>
									<FormTextInput
										labelText="Asiakas"
										value={driveAssEditTarget.invoiceClient}
										onChangeText={(value) => updateEditTarget(value, 'invoiceClient')}
									/>
									<View>
										<PickerHeader>Valitse laskun saaja</PickerHeader>
										<PickerContainer
											mode="dropdown"
											placeholder="Laskunsaaja"
											selectedValue={driveAssEditTarget.invoiceTarget}
											onValueChange={(value) => updateEditTarget(value, 'invoiceTarget')}
											textStyle={{
												color: 'red',
												backgroundColor: 'red',
											}}
											itemStyle={{
												color: 'red',
												backgroundColor: 'red',
											}}
											itemTextStyle={{
												color: 'red',
												backgroundColor: 'red',
											}}
											headerStyle={{
												color: 'red',
												backgroundColor: 'red',
											}}
										>
											<Item label="Kela" value="Kela" />
											<Item label="Kela2" value="Kela2" />
										</PickerContainer>
									</View>
								</View>
							)}
							<FormTextInput
								labelText="Hinta"
								value={driveAssEditTarget.cost}
								keyboardType="numeric"
								onChangeText={(value) => updateEditTarget(value, 'cost')}
							/>
						</KeyboardAvoidingView>
					</StyledScrollView>

					<ButtonContainer>
						<FlexButton bordered onPress={() => deleteDriveAss(driveAssEditTarget)}>
							<Text>Poista</Text>
						</FlexButton>
						<FlexButton onPress={toggleDriveAssEdit}>
							<Text>Peruuta</Text>
						</FlexButton>
						<FlexButton onPress={() => saveDriveAssEdit(driveAssEditTarget)}>
							<Text>Tallenna</Text>
						</FlexButton>
					</ButtonContainer>
				</Content>
			</Container>
		</StyledModal>
	);
}

const mapStateToProps = ({ drivememoReducer, generalReducer }) => ({
	addDrivememoScreen: Object.assign({}, drivememoReducer, generalReducer),
});

const mapDispatchToProps = (dispatch) => {
	return {
		updateEditTarget: (value, field) => dispatch(updateEditTarget(value, field)),
		toggleDriveAssEdit: () => dispatch(toggleDriveAssEdit()),
		saveDriveAssEdit: (target) => dispatch(saveDriveAssEdit(target)),
		deleteDriveAss: (target) => dispatch(deleteDriveAss(target)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DriveAssignmentModal);
