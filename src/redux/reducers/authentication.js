import { FALSE, TRUE } from "../actions"

const defaultState = {
  isAuthenticated: undefined
}

const authenticate = (state = defaultState, action) => {
  switch (action.type) {
    case FALSE:
      return {
        ...state,
        isAuthenticated: false
      }
    case TRUE:
      return {
        ...state,
        isAuthenticated: true
      }
    default:
      return state
  }
}

export default authenticate