import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Text } from 'native-base';
import { FormTextInput } from './index.js';

const Container = styled.View`
	margin-top: 14px;
	margin-bottom: 7px;
	display: flex;
	flex-direction: row;
`;

const S_text = styled.Text`
	display: flex;
	font-size: 15px;
	color: #575757;
`;

const S_text_km = styled.Text`
	display: flex;
	padding-left: 7px;
	font-size: 15px;
`;

function TotalMileage({ totalMileage }) {
	//console.log('TotalMileage.js props---: ', props);

	return (
		<Container>
			<S_text>Kilometrejä yhteensä ajovuorossa:</S_text>
			<S_text_km>
				{totalMileage && totalMileage.toString()} {totalMileage && ' km'}
			</S_text_km>
		</Container>
	);
}

export default TotalMileage;
