import React from 'react';
import styled from 'styled-components/native';

import { 
    Modal,
    View,
    ScrollView,
    KeyboardAvoidingView
 } from 'react-native';


import { connect } from 'react-redux';

import {
    Button,
    Tab, 
    Tabs,
    Text,
    Picker,
    Item
} from 'native-base';

import {
    FormTextInput
} from '../components/index.js';


const StyledModal = styled.Modal`
    
`;

const ButtonContainer = styled.View`
    height: 60px;
    flexDirection: row-reverse;
`;

const PickerContainer = styled(Picker)` 

`;

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


import {
    addDriveAssignment,
    onChangeActiveField,
    toggleDriveAssModal,
    invoiceTargetChange,
    invoiceClientInput,
} from '../actions/drivememo.actions.js';



function DriveAssignmentModal({
    animationType,
    transparent,
    //invoiceTarget,
    addDrivememoScreen,    
    //drivememoInfo,
    visible,
    toggleDriveAssModal,
    onChangeTextInput,
    onChangeTab,
    onRequestClose,
    onChangeActiveField,
    onInvoiceClientInput,
    onInvoiceTargetChange,
    onAddDriveAssignment,
    ...props,
}) {

    const {
        invoiceTarget,
        invoiceClient,
        activeDrivememoField,
        drivememoInfo,
    } = addDrivememoScreen; 


   // console.log('activeDrivememoField in modal: ', addDrivememoScreen);
    const enableAdding = (() => {
        if(activeDrivememoField === 'invoiceDrive') {
            console.log('invoice: ', !!drivememoInfo.invoiceDrive && !!invoiceTarget && invoiceClient);
            return !!drivememoInfo.invoiceDrive && !!invoiceTarget && invoiceClient
        }
        if (activeDrivememoField === 'cardDrive' && drivememoInfo.cardDrive) {
            return true
        }
        if (activeDrivememoField === 'cashDrive' && drivememoInfo.cashDrive) {
            return true
        }
        return false
    })();

    return (
        <StyledModal
            animationType={animationType}
            transparent={transparent}
            visible={visible}
            onRequestClose={onRequestClose}
            keyboardShouldPersistTaps='always'
            keyboardDismissMode='on-drag'
        >
            <Tabs 
                initialPage={0}
                onChangeTab={onChangeTab}
            >
                <Tab heading='Korttiajo' name='cardDrive'>
                    <StyledScrollView>
                        <KeyboardAvoidingView behavior='position' contentContainerStyle={{paddingTop:-50}}>
                            <FormTextInput
                                labelText='Hinta' 
                                keyboardType='numeric'
                                onChangeText={onChangeTextInput}
                                onFocus = {() => onChangeActiveField('cardDrive')}
                            />
                        </KeyboardAvoidingView>
                    </StyledScrollView>
                </Tab>
                <Tab heading='Käteisajo' name='cashDrive'>
                    <StyledScrollView>
                        <KeyboardAvoidingView behavior='position' contentContainerStyle={{paddingTop:-50}}>
                            <FormTextInput
                                labelText='Hinta' 
                                keyboardType='numeric' 
                                onChangeText={onChangeTextInput}
                                onFocus = {() => onChangeActiveField('cashDrive')}
                            />
                        </KeyboardAvoidingView>
                    </StyledScrollView>
                </Tab>
                <Tab heading='Laskutettava' name='invoiceDrive'>
                    <StyledScrollView>
                    <KeyboardAvoidingView behavior='position' contentContainerStyle={{paddingTop:-50}}>
                        <FormTextInput
                                labelText='Asiakas' 
                                onChangeText={(value) => onInvoiceClientInput(value)}
                                onFocus = {() => onChangeActiveField('invoiceDrive')}
                            />
                            <View>
                                <PickerHeader>Valitse laskun saaja</PickerHeader>
                                <PickerContainer
                                    mode="dropdown"
                                    placeholder="Laskunsaaja"
                                    selectedValue={invoiceTarget}
                                    onValueChange={(value) => onInvoiceTargetChange(value)}
                                    textStyle={{color:'red', backgroundColor:'red'}}
                                    itemStyle={{color:'red', backgroundColor:'red'}}
                                    itemTextStyle={{color:'red', backgroundColor:'red'}}
                                    headerStyle={{color:'red', backgroundColor:'red'}}
                                >
                                    <Item label="Kela" value="Kela" />
                                    <Item label="Kela2" value="Kela2" />
                                </PickerContainer>
                            </View>
                            <FormTextInput
                                labelText='Hinta' 
                                keyboardType='numeric' 
                                onChangeText={onChangeTextInput}
                                onFocus = {() => onChangeActiveField('invoiceDrive')}
                            />
                            </KeyboardAvoidingView>
                    </StyledScrollView>
                </Tab>
            </Tabs>

            <ButtonContainer keyboardShouldPersistTaps='always'>
                <FlexButton onPress={onAddDriveAssignment} disabled = {!enableAdding}>
                    <Text>Lisää listaan</Text>
                </FlexButton>

                <FlexButton onPress={() => toggleDriveAssModal()}>
                    <Text>Peruuta</Text>
                </FlexButton>
            </ButtonContainer>

        </StyledModal>
    )
}


const mapStateToProps = ({drivememoReducer, generalReducer}) => (
    {   
        addDrivememoScreen: Object.assign({},
            drivememoReducer,
            generalReducer
        ),
    }
);

const mapDispatchToProps = (dispatch) => {
    //console.log('loginscreen dispatch: ', dispatch)
    return {        
        onChangeActiveField: (field) => dispatch(onChangeActiveField(field)),
        onInvoiceTargetChange: (value) => dispatch(invoiceTargetChange(value)),
        onInvoiceClientInput: (value) => dispatch(invoiceClientInput(value)),
        toggleDriveAssModal: () => dispatch(toggleDriveAssModal()),
        closeModal: () => dispatch(closeModal()),
    }
}



export default connect (mapStateToProps, mapDispatchToProps) (DriveAssignmentModal);



