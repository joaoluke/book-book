import { LOGIN, LOGOUT } from '../actions'

const defaultState = {
  token: localStorage.getItem('authToken') || "",
  user: JSON.parse(localStorage.getItem("currentUser")) || {}
}

const session = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.token, user: action.user };

    case LOGOUT:
      return defaultState;

    default:
      return state;
  }
}

export default session