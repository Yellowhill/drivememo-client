import React from 'react';
import Styled from 'styled-components/native';
import { Title } from 'native-base';

const S_title = Styled(Title)`
	margin-top: 18px;
    margin-left: -64px;
`;

const StyledTitle = ({ children }) => <S_title>{children}</S_title>;
export default StyledTitle;
