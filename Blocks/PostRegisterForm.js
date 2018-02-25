import React from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'

import { KeyboardAvoidingView } from 'react-native'

import { Form, Button, Text } from 'native-base'

import { FormTextInput } from '../components/index.js'

const Container = styled.View`
	margin-top: 50px;
`

const PostRegisterForm = (props) => {
	return (
		<KeyboardAvoidingView behavior="padding">
			<Form>
				<Container>
					<FormTextInput
						labelText="Kuskin nimi"
						onChangeText={props.onDriverNameChange}
					/>
					<FormTextInput
						labelText="Ajomuistion vastaanottajan sähköpostiosoite"
						keyboardType="email-address"
						onChangeText={props.onDriveMemoReceiverChange}
					/>
				</Container>
				<Container>
					<Button onPress={props.onSubmit} block>
						<Text>{props.btnText}</Text>
					</Button>
				</Container>
			</Form>
		</KeyboardAvoidingView>
	)
}

export default PostRegisterForm
