import { SETLIST } from '../actions' 

const defaultState = []
 
const timeline = (state = defaultState, action) => {
  switch (action.type) {
    case SETLIST:
      const {list} = action
      return [...state, ...list];
    default:
      return state;
  }
}
export default timeline;
