

//troca de prateleira
//Grava o id do livro clicado na prateleira
import { SET_ID_BOOK } from '../actions' 

const defaultState = {
     bookId : 0
}
 
const  shelf= (state = defaultState, action) => {
  switch (action.type) {
    case SET_ID_BOOK:
      const {bookId} = action 
      return {...state, bookId};

    default:
      return state;
  }
}
export default shelf;
