import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { FormTextInput } from './index.js';

import { TimePickerAndroid, DatePickerAndroid } from 'react-native';

import { Item, Input, Label, Icon } from 'native-base';

const StyledItem = styled(Item)`
	margin-top: 7px;
	margin-bottom: 7px;
`;

class DateTimePicker extends React.Component {
	formatDateNumb = (numb) => (numb < 10 ? `0${numb}` : numb);

	handleFocus = async () => {
		const { name, onDateTimePick, onDatePickCancel, onTimePickCancel } = this.props;

		const { action, year, month, day } = await DatePickerAndroid.open();
		if (action !== 'dismissedAction') {
			const { action, hour, minute } = await TimePickerAndroid.open();
			if (action !== 'dismissedAction') {
				const minuteFormated = minute < 10 ? `0${minute}` : minute;
				onDateTimePick({
					field: name,
					dateTimeStr: `${year}-${this.formatDateNumb(month + 1)}-${this.formatDateNumb(
						day
					)}T${this.formatDateNumb(hour)}:${this.formatDateNumb(minute)}`,
				});
			}
		}
		this.blurInput();
	};

	blurInput = () => {
		this.dateInput._root.blur();
	};

	render() {
		const { label, name } = this.props;
		return (
			<StyledItem stackedLabel>
				<Label>{label}</Label>
				<Input
					{...this.props}
					name={name}
					onFocus={this.handleFocus}
					getRef={(input) => (this.dateInput = input)}
				/>
			</StyledItem>
		);
	}
}

const { string, func } = PropTypes;

DateTimePicker.propTypes = {
	label: string,
	name: string,
	onDateTimePick: func,
	onDatePickCancel: func,
	onTimePickCancel: func,
};
export default DateTimePicker;
