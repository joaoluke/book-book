import { combineReducers } from "redux";
import session from './session'
import authenticate from './authentication'

export default combineReducers({ session, authenticate });
