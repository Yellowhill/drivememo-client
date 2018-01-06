import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { ListItem, Text, Radio, Right, Left } from 'native-base';

const DraftCheckbox = ({ draft, onPress }) => {
	return (
		<ListItem>
			<Right>
				<Radio onPress={onPress} selected={draft} />
			</Right>
			<Text>Luonnos</Text>
		</ListItem>
	);
};

DraftCheckbox.propTypes = {
	draft: PropTypes.bool,
	onPress: PropTypes.func,
};
export default DraftCheckbox;
