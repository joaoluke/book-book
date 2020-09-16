import { SET_USER_BOOKS } from '../actions';

const defaultState = [];

const prateleiras = (state = defaultState, action) => {

  switch (action.type) {
    case SET_USER_BOOKS:
    const {books} = action
      return [...state,...books ];
      
    default:
      return state;
  }
}
export default prateleiras;