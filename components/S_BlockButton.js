import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Text, Button } from 'native-base';

const S_BlockButton = styled(Button)`
	margin-top: 7px;
	margin-bottom: 7px;
`;

export default props => {
	return (
		<S_BlockButton
			block
			onPress={props.onPress}
			accessibilityLabel={props.accessibilityLabel}
		>
			<Text>{props.text}</Text>
		</S_BlockButton>
	);
};
