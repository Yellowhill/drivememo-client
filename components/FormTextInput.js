import React from 'react';
import styled from 'styled-components/native';
import { View, Keyboard } from 'react-native';
import { Item, Input, Label, Icon } from 'native-base';

const StyledItem = styled(Item)`
	margin-top: 7px;
	margin-bottom: 7px;
`;

function FormTextInput(props) {
	//console.log('FormTextInput.js props---: ', props);

	return (
		<StyledItem floatingLabel>
			<Label>{props.labelText}</Label>
			<Input
				{...props}
				name={props.name}
				onChangeText={props.onChangeText}
				onBlur={props.onBlur}
				onFocus={props.onFocus}
				secureTextEntry={props.secure}
				getRef={input => (this.textInput = input)}
			/>
		</StyledItem>
	);
}

export default FormTextInput;

// class FormTextInput extends React.Component {
//     componentWillMount() {
//         this.keyboardDidHideListener = Keyboard.addListener(
//             'keyboardDidHide',
//             this._keyboardDidHide(this)
//         )
//     }
//     componentWillUnmount() {
//         this.keyboardDidHideListener.remove();
//     }

//     _keyboardDidHide() {
//         //this.blurInput();
//         console.log('keyboardhide this: ', this);
//     }

//     blurInput = () => {
//         this.textInput._root.blur();
//     }
//     //console.log('FormTextInput.js props---: ', props);
//     render() {
//         const {
//             name,
//             labelText,
//             onChangeText,
//             secure,
//             onFocus,
//             onBlur,
//         } = this.props;
//         return (
//             <StyledItem floatingLabel>
//                 <Label>{labelText}</Label>
//                 <Input
//                     {...this.props}
//                     name={name}
//                     onChangeText={onChangeText}
//                     onBlur={onBlur}
//                     onFocus={onFocus}
//                     secureTextEntry={secure}
//                     getRef={(input) => this.textInput = input}
//                 />
//             </StyledItem>
//         );
//     }
//      };

// export default FormTextInput;
