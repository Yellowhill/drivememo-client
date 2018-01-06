import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const StyledScreenContainer = styled.View`
	background-color: ${props => props.backgroundColor || 'transparent'};
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	height: 100%;
	width: 100%;
	padding: 15px 10px 0 10px;
`;

const ScreenContainer = props => {
	return <StyledScreenContainer>{props.children}</StyledScreenContainer>;
};

export default StyledScreenContainer;
