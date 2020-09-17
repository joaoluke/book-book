import React, { useEffect } from "react";
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { requestUserBooks } from '../../../redux/actions'
import axios from 'axios'

const { Meta } = Card;

const Prateleiras = () => {

  const userId = useSelector((state) => state.session.user.id)
  const dispatch = useDispatch();
  const token = useSelector((state) => state.session.token)

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

  const trocaPrateleira = (bookID) => {
    console.log(bookID)
    console.log(userId)
    console.log(token)
    axios
    .put(`https://ka-users-api.herokuapp.com/users/${userId}/books/${bookID}`,
      {        
        "book": {
          "shelf": 3
        }
      },
      { headers: { Authorization: token } }
    )
    .then(resp => {
      console.log(resp)
    })
    .catch((error) => { 
      console.log(error)
    })
  }
  return (
    <div> PRATELEIRAS
      <h1> Quero Ler</h1>
      {books.filter(({ shelf }) => shelf === 1).map((book, index) => (

        <>
          <Card
            hoverable
            style={{ width: 200 }}
            // onClick={() => console.log(book.id) }
            onClick={() => trocaPrateleira(book.id) }
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
            onClick={() => trocaPrateleira(book.id) }
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
            onClick={() => trocaPrateleira(book.id) }
            cover={<img alt="example" src={book.image_url} />}
          >
            <Meta title={ book.title} description="" />
          </Card>
        </>
      ))}

    </div>
  )
}

export default Prateleiras;
