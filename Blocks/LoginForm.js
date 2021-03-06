import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { KeyboardAvoidingView } from 'react-native';

import { Form, Button, Text } from 'native-base';

import { FormTextInput } from '../components/index.js';

const Container = styled.View`
	margin-top: 50px;
`;

const LoginForm = (props) => {
	return (
		<KeyboardAvoidingView behavior="padding">
			<Form>
				<Container>
					<FormTextInput
						labelText="Sähköpostiosoite"
						onChangeText={props.onEmailChange}
						keyboardType="email-address"
					/>
					<FormTextInput labelText="Salasana" onChangeText={props.onPasswordChange} />
					{props.registerForm && (
						<FormTextInput
							labelText="Vahvista salasana"
							onChangeText={props.onPasswordConfirmChange}
						/>
					)}
				</Container>
				<Container>
					<Button onPress={props.onSubmit} block>
						<Text>{props.btnText}</Text>
					</Button>
				</Container>
			</Form>
		</KeyboardAvoidingView>
	);
};

export default LoginForm;
