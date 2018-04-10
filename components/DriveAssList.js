import React from 'react';
import moment from 'moment';
import { View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';

const Container = styled.View`
	margin-top: 18px;
	margin-bottom: 18px;
`;

const HeaderRow = styled.View`
	background-color: #484848;
	flex: 1;
	flex-direction: row;
	align-content: space-around;
`;

const Row = styled.View`
	flex: 1;
	flex-direction: row;
	align-content: space-around;
`;

const ListRow = Row.extend`
	background-color: ${(props) => (props.isOdd ? '#ffbd45' : 'white')};
`;

const Column = styled.View`
	flex: 1;
	height: 32px;
	justify-content: space-around;
	padding: 4px;
	padding-left: 7px;
`;

const DateColumn = Column.extend`
	flex-grow: 1.5;
`;

const S_text = styled.Text``;

const HeaderColumn = styled.Text`
	flex: 1;
	padding-top: 3px;
	padding-bottom: 3px;
	padding-left: 0;
	color: white;
`;

const DateHeaderColumn = HeaderColumn.extend`
	flex-grow: 1.5;
`;

const Title = styled.Text`
	flex: 1;
	flex-grow: 1.5;
	font-size: 20px;
	color: black;
`;

const TitleRow = Row.extend`
	background-color: #ffbc45;
	margin-bottom: 0px;
	align-items: center;
`;

const AddButton = styled(Button)`
	background-color: transparent;
`;
const AddButtonIcon = styled(Icon)`
	font-size: 16px;
	padding-top: 2px;
	color: black;
`;

const AddButtonText = styled(Text)`
	font-size: 14px;
	color: black;
	margin-left: -10px;
`;

const DriveAssList = ({ driveAssignments, onRowPress, toggleDriveAssModal }) => {
	console.log('driveAssList: ', driveAssignments);

	const renderRow = ({ item, index }) => {
		return (
			<TouchableOpacity
				key={index}
				onPress={() => onRowPress(Object.assign({}, item, { index: index }))}
				style={{ flex: 1 }}
			>
				<ListRow isOdd={index % 2 == 1}>
					<DateColumn>
						<S_text>{moment(item.entryTime).format('DD.MM.YYYY HH:mm')}</S_text>
					</DateColumn>
					<Column>
						<S_text>
							{item.assType === 'cardDrive'
								? 'Korttiajo'
								: item.assType === 'cashDrive' ? 'Käteisajo' : 'Laskutettava'}
						</S_text>
					</Column>
					<Column>
						<S_text>{item.cost}€</S_text>
					</Column>
				</ListRow>
			</TouchableOpacity>
		);
	};

	return (
		<Container>
			<TitleRow>
				<Title> Ajotapahtumat </Title>
				<TouchableOpacity>
					<AddButton iconLeft transparent onPress={toggleDriveAssModal}>
						<AddButtonIcon name="add" />
						<AddButtonText>Lisää merkintä</AddButtonText>
					</AddButton>
				</TouchableOpacity>
			</TitleRow>

			<HeaderRow>
				<DateHeaderColumn> Kirjausaika </DateHeaderColumn>
				<HeaderColumn> Ajotyyppi </HeaderColumn>
				<HeaderColumn> Hinta </HeaderColumn>
			</HeaderRow>
			<FlatList
				data={driveAssignments}
				renderItem={(item) => renderRow(item)}
				keyExtractor={(item, index) => index.toString()}
				onRowPress={onRowPress}
			/>
		</Container>
	);
};

DriveAssList.propTypes = {
	assignments: PropTypes.arrayOf(PropTypes.object),
};

export default DriveAssList;

/**
 * 			{driveAssignments.map((ass, i) => (
				<TouchableOpacity
					key={i}
					onPress={() => onRowPress(Object.assign({}, ass, { index: i }))}
				>
					<Row>
						<Column>
							<S_text>
								{moment(ass.entryTime).format('DD.MM.YYYY HH:mm')}
							</S_text>
						</Column>
						<Column>
							<S_text>
								{ass.assType === 'cardDrive'
									? 'Korttiajo'
									: ass.assType === 'cashDrive' ? 'Käteisajo' : 'Laskutettava'}
							</S_text>
						</Column>
						<Column>
							<S_text>{ass.cost}</S_text>
						</Column>
					</Row>
				</TouchableOpacity>
			))}
 */
