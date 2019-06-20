import {combineReducers} from 'redux';
import tasksList from './tasks-list'
import token from './token'
export default combineReducers({
    tasksList,
    token
});