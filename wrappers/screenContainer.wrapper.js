import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { StyleProvider, Drawer } from 'native-base';
import SideBar from '../Blocks/SideBar.js';

const StyledScreenContainer = styled.View`
	background-color: ${(props) => props.backgroundColor || 'transparent'};
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	height: 100%;
	width: 90%;
	padding: 15px 10px 0 10px;
`;
const ScreenContainer = (WrappedScreen) =>
	class diu extends React.Component {
		handleCloseDrawer = () => {
			this.drawer._root.close();
		};

		handleOpenDrawer = () => {
			this.drawer._root.open();
		};

		render() {
			return (
				<Drawer
					ref={(ref) => {
						this.drawer = ref;
					}}
					content={<SideBar navigation={this.props.navigation} />}
					onClose={() => this.handleCloseDrawer()}
				>
					<WrappedScreen onOpenDrawer={this.handleOpenDrawer} {...this.props} />
				</Drawer>
			);
		}
	};

export default ScreenContainer;
