import { NavigationActions } from 'react-navigation';

export const navToAddDrivememo = NavigationActions.navigate({
	routeName: 'AddDrivememo',
});

export const navToRegister = NavigationActions.navigate({
	routeName: 'Register',
});

export const navToPostRegister = NavigationActions.navigate({
	routeName: 'PostRegister',
});

export const navToLogin = NavigationActions.navigate({
	routeName: 'Login',
});

export const navToProfile = NavigationActions.navigate({
	routeName: 'Profile',
});
