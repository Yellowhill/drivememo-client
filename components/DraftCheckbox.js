import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { ListItem, Text, Radio, Right, Left } from 'native-base';

const CheckboxContainer = styled.View`
	display: flex;
	flex-direction: row;
`;

const CheckboxText = styled.Text`
	display: flex;
	margin-left: 7px;
	padding-top: 2px;
`;

const DraftCheckbox = ({ draft, onPress }) => {
	return (
		<CheckboxContainer>
			<Radio onPress={onPress} selected={draft} />
			<CheckboxText>Keskeneräinen</CheckboxText>
		</CheckboxContainer>
	);
};

DraftCheckbox.propTypes = {
	draft: PropTypes.bool,
	onPress: PropTypes.func,
};
export default DraftCheckbox;
