import axios from 'axios'
export const LOGIN = "LOGIN";
export const LOGOUT = 'LOGOUT'
export const TRUE = 'TRUE'
export const FALSE = 'FALSE'
export const LOADING = 'LOADING'
export const SETLIST = 'SETLIST' //  timeline
export const SET_USER_BOOKS = 'SET_USER_BOOKS'
export const SET_USER_BOOK = 'SET_USER_BOOK' // prateleiras
export const SET_BOOKS = 'SET_BOOKS'
export const SET_ID_BOOK = 'SET_ID_BOOK' // id livro pra troca prateleira
export const ADD_BOOKS = 'ADD_BOOKS'


//======= session Actions ========/

export const login = (token, user) => ({
  type: LOGIN,
  token,
  user,
});

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
  dispatch(setAuthenticationFalse())
};

export const requestLogin = (user, password) => (dispatch) => {
  axios.post("https://ka-users-api.herokuapp.com/authenticate", { user, password })
    .then((res) => {
      dispatch(login(res.data.auth_token, res.data.user))
      window.localStorage.setItem("authToken", res.data.auth_token)
      window.localStorage.setItem("currentUser", JSON.stringify(res.data.user))
      dispatch(setAuthenticationTrue())
    })
    .catch(() => {
      dispatch(setAuthenticationFalse())
    }
    )
};

export const requestValidate = () => (dispatch) => {
  const token = window.localStorage.getItem("authToken")
  if (!token) {
    dispatch(setAuthenticationFalse())
  }
  axios.get("https://ka-users-api.herokuapp.com/users", {
    headers: { Authorization: token },
  })
    .then(() => {
      dispatch(setAuthenticationTrue())
    })
    .catch(() => setAuthenticationFalse())
}

export const setAuthenticationFalse = () => ({
  type: FALSE
});

export const setAuthenticationTrue = () => ({
  type: TRUE
});

//==============================


export const setList = (list) => ({
  type: SETLIST,
  list,
})

//*******Prateleira*************************
export const setUserBooks = (books) => ({
  type: SET_USER_BOOKS,
  books,
})

export const setUserBook = (book) => ({
  type: SET_USER_BOOK,
  book,
})

export const requestUserBooks = (userId) => (dispatch, getState) => {
  const { session } = getState()
  axios
    .get(`https://ka-users-api.herokuapp.com/users/${userId}/books/`,
      { headers: { Authorization: session.token } }
    )
    .then(resp => {
      dispatch(setUserBooks(resp.data));
      console.log(resp.data)
    })
    .catch((error) => { // erro no request
      console.log(error)
    })
}


//*******Timeline*************************
export const setBooks = (books) => ({
  type: SET_BOOKS,
  books,
})

export const requestBooks = () => (dispatch, getState) => {
  const { session } = getState()
  axios
    .get(`https://ka-users-api.herokuapp.com/book_reviews`,
      { headers: { Authorization: session.token } }
    )
    .then(resp => {
      dispatch(setBooks(resp.data));
    })
    .catch((error) => { // erro no request
      console.log(error)
    })
}

// ******************Troca de Prateleira

export const setBooksId = (bookId) => ({
  type: SET_ID_BOOK,
  bookId,
})

export const requestBookId = (book, userId, shelf) => (dispatch, getState) => {
  const { session } = getState()
  const bookId = book
  let NewShelf = shelf

  console.log("TESTE")
  NewShelf === 1 ? (NewShelf = 2) : (NewShelf = 3)
  console.log(NewShelf)
  axios

    .put(`https://ka-users-api.herokuapp.com/users/${userId}/books/${bookId}`,
      {
        "book": {
          "shelf": NewShelf
        }
      },
      { headers: { Authorization: session.token } }
    )
    .then(resp => {
      console.log("teste")
      dispatch(requestUserBooks(userId));
    })
    .catch((error) => {
      console.log(error)
    })
}

export const addBooks = () => ({
  type: ADD_BOOKS
})

export const postUserBooks = (values) => (dispatch, getState) => {
  const { session } = getState()
  console.log(values)
  console.log(session)
  axios.post(`https://ka-users-api.herokuapp.com/users/${session.user.id}/books`, values, {
    headers: {
      'Authorization': session.token,
      'Content-Type': 'application/json'
    },
  })
    .then((res) => dispatch(setUserBook(values)))

    .catch((error) => { // erro no request
      console.log(error)
    })
}
