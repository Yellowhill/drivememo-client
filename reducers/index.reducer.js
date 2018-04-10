import { combineReducers } from 'redux';
import drivememoReducer from './drivememo.reducer.js';
import authReducer from './auth.reducer.js';
import generalReducer from './general.reducer';
import userReducer from './user.reducer';
import { navReducer } from '../Navigation.js';

console.log('this is navReducer in indexReducer: ', navReducer);

const rootReducer = combineReducers({
	drivememoReducer,
	authReducer,
	navReducer,
	generalReducer,
	userReducer,
});
console.log('in indexReducer: ');

export default rootReducer;
