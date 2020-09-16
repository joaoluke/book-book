import { combineReducers } from "redux";
import session from './session'
import authenticate from './authentication'
import timeline from './timeline'
import books from './books'

export default combineReducers({ session, authenticate , timeline, books});
