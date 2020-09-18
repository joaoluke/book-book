import { SET_USER_BOOKS } from '../actions';

const defaultState = [];

const prateleiras = (state = defaultState, action) => {

  console.log("teste2");
  console.log(action.books)
  switch (action.type) {
    case SET_USER_BOOKS:
    const {books} = action
      return [...books ];
      
    default:
      return state;
  }
}
export default prateleiras;