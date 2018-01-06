import React from 'react';
import { Field } from 'redux-form';

import FormTextInput from '../components/FormTextInput.js';

import { ScrollView, Text, View, Button, TouchableOpacity } from 'react-native';

export default function() {
	return (
		<View>
			<Text>Käteisajo</Text>
			<Text>Korttiajo</Text>
			<Text>Laskutettavat</Text>
			<Field name={'cashDrive'} component={FormTextInput} />
			<Field name={'cardDrive'} component={FormTextInput} />
			<Field name={'invoiceDrive'} component={FormTextInput} />
		</View>
	);
}

/**
     *         <Field name="favoriteColor" component="select">
            <option />
            <option value="cashDrive">Käteisajo</option>
            <option value="cardDrive">Korttiajo</option>
            <option value="invoiceDrive">Laskutettavat</option>
        </Field>
     */
