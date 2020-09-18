import React, { useEffect, useState } from "react";
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { requestUserBooks } from '../../../redux/actions'
import axios from 'axios'
import { setBooksId, requestBookId} from '../../../redux/actions'
import Review from "../review"
//feedback-- --------
import { Form, Input, Button } from 'antd';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
//--------------------------


const { Meta } = Card;
let shelf = 1
const Prateleiras = () => {

  const userId = useSelector((state) => state.session.user.id)
  const dispatch = useDispatch();
  const token = useSelector((state) => state.session.token)
  const bookId = useSelector((state) => state.shelf)

  
  useEffect(() => {
    userId && dispatch(requestUserBooks(userId)
    )
  }, [dispatch, userId])

  const books = useSelector((state) => {
    return state.books
  })

  if (books.length <= 0) {
    return <div> carregando </div>
  }

  

//---------Troca Prateleira------------------------------------------------------
  // const trocaPrateleira = (bookId, bookShelf, book) => {
  //    dispatch(setBooksId(bookId))
   
  //   shelf === 1 ? (shelf = 2) : (shelf = 3)
   
  //   axios
  //   .put(`https://ka-users-api.herokuapp.com/users/${userId}/books/${bookId}`,
  //     {        
  //       "book": {
  //         "shelf": shelf
  //       }
  //     },
  //     { headers: { Authorization: token } }
  //   )
  //   .then(resp => {
  //     console.log(resp)
  //   })
  //   .catch((error) => { 
  //     console.log(error)
  //   })
  // }


//-----------------------------------------------------------------------
  return (
    <div> PRATELEIRAS
      <h1> Quero Ler</h1>
     
      {books.filter(({ shelf }) => shelf === 1).map((book, index) => (

        <>
          <Card
            hoverable
            style={{ width: 200 }}
            // onClick={() => console.log(book.id) }
            onClick={() => {  
              dispatch(requestBookId(book.id, userId,shelf))
              console.log(shelf)
              
            }}
            cover={<img alt="example" src={book.image_url} />}
          >
            <Meta title={book.title} description="" />
          </Card>

        </>
      ))}

      <h1> Estou Lendo</h1>
      {books.filter(({ shelf }) => shelf === 2).map((book, index) => (
        <>
          <Card
            hoverable
            style={{ width: 200 }}
            // onClick={() => console.log(book.id) }
            onClick={() => {  
              dispatch(requestBookId(book.id, userId))
              console.log("teste botao")
            }}
            cover={<img alt="example" src={book.image_url} />}
          >
            <Meta title={ book.title} description="" />
          </Card>
        </>
      ))}

      <h1> Lido </h1>
      {books.filter(({ shelf }) => shelf === 3).map((book, index) => (
        <>
        <Card
            hoverable
            style={{ width: 200 }}
            // onClick={() => console.log(book.id) }
            onClick={() => {  
              dispatch(requestBookId(book.id, userId))
              console.log("teste botao")
            }}
            cover={<img alt="example" src={book.image_url} />}
          >
            <Meta title={ book.title} description="" />
          </Card>
        </>
       
      ))}
 // <Review></Review>
    </div>
  )
}

export default Prateleiras;
