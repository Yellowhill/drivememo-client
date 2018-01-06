import React from 'react';
import moment from 'moment';
import { Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import PropTypes from 'prop-types';

import styled from 'styled-components/native';

const Row = styled.View`
	flex: 1;
	flex-direction: row;
	align-content: space-around;
	border: 1px solid red;
`;

const Column = styled.View`
	flex: 1;
	border: 1px solid blue;
	height: 32px;
	justify-content: space-around;
`;

const S_text = styled.Text`
	border: 1px solid green;
`;

const HeaderColumn = styled.Text`
	flex: 1;
	border: 1px solid blue;
`;

const Header = styled.Text`
	flex: 1;
	font-size: 18px;
`;

const renderRow = ({ item, index }) => {
	return (
		<TouchableOpacity
			key={index}
			onPress={() => onRowPress(Object.assign({}, item, { index: index }))}
			style={{ flex: 1 }}
		>
			<Row>
				<Column>
					<S_text>{moment(item.entryTime).format('DD.MM.YYYY HH:mm')}</S_text>
				</Column>
				<Column>
					<S_text>
						{item.assType === 'cardDrive'
							? 'Korttiajo'
							: item.assType === 'cashDrive' ? 'Käteisajo' : 'Laskutettava'}
					</S_text>
				</Column>
				<Column>
					<S_text>{item.cost}</S_text>
				</Column>
			</Row>
		</TouchableOpacity>
	);
};

const DriveAssList = ({ driveAssignments, onRowPress }) => {
	console.log('driveAssList: ', driveAssignments);
	return (
		<View>
			<Row>
				<Header> Ajotapahtumat </Header>
			</Row>
			<Row>
				<HeaderColumn> Kirjausaika </HeaderColumn>
				<HeaderColumn> Ajotyyppi </HeaderColumn>
				<HeaderColumn> Hinta </HeaderColumn>
			</Row>
			<FlatList
				data={driveAssignments}
				renderItem={item => renderRow(item)}
				keyExtractor={(item, index) => index}
				onRowPress={onRowPress}
			/>
		</View>
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
