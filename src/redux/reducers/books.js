import { SET_USER_BOOKS, SET_USER_BOOK } from '../actions';

const defaultState = [];

const prateleiras = (state = defaultState, action) => {

  switch (action.type) {
    case SET_USER_BOOKS:
      const { books } = action
      return [...state, ...books];
    case SET_USER_BOOK:
      const { book } = action
      return [...state, book];

    default:
      return state;
  }
}
export default prateleiras;