import { SET_BOOKS } from '../actions' 

const defaultState = []
 
const timeline = (state = defaultState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      const {books} = action
      return [...books];
    default:
      return state;
  }
}
export default timeline;
