import React from 'react';
import styled from 'styled-components/native';
import { View, Keyboard } from 'react-native';
import { Item, Input, Label, Icon } from 'native-base';

const StyledItem = styled(Item)`
	margin-top: 7px;
	margin-bottom: 7px;
`;

function FormTextInput(props) {
	//console.log('FormTextInput.js props---: ', props);

	return (
		<StyledItem stackedLabel>
			<Label>{props.labelText}</Label>
			<Input
				{...props}
				name={props.name}
				onChangeText={props.onChangeText}
				onBlur={props.onBlur}
				onFocus={props.onFocus}
				secureTextEntry={props.secure}
				getRef={(input) => (this.textInput = input)}
			/>
		</StyledItem>
	);
}

export default FormTextInput;
