import { combineReducers } from 'redux';
import Login from './login';

const rootReducer = combineReducers({
    login: Login,
});

export default rootReducer; 