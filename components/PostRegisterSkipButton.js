import React from 'react';
import { View, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { Header, Content, Body, Spinner, Text, Title, Button, Icon } from 'native-base';

import styled from 'styled-components/native';

// prettier-ignore
const Container = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: center;
    alignItems: center;
    margin-top: 100px;
`;
// prettier-ignore
const Remark = styled(Text)`
	margin-top: -14px;
`;

// prettier-ignore
const StyledTouchableOpacity = styled(TouchableOpacity)`
    flex: 1;
    flexDirection: row;
    justifyContent: center;
    padding-top: 14px
    padding-bottom: 14px;
`;

// prettier-ignore
const StyledIcon = styled(Icon)`
    margin-top: -2px;
    margin-left: -7px;
`

const PostRegisterSkipButton = ({ onPress }) => (
	<Container>
		<View>
			<Button transparent dark iconRight>
				<StyledTouchableOpacity onPress={onPress}>
					<Text>OHITA NÄKYMÄ </Text>
					<StyledIcon name="arrow-forward" />
				</StyledTouchableOpacity>
			</Button>
		</View>

		<Remark note>*Käyttäjätiedot voi päivittää myöhemmin profiilisivulla</Remark>
	</Container>
);

export default PostRegisterSkipButton;
