import { SETLIST } from '../actions' 

const defaultState = []
 
const timeline = (state = defaultState, action) => {
  switch (action.type) {
    case SETLIST:
      return [...state, action.list];
    default:
      return state;
  }
}
export default timeline;
