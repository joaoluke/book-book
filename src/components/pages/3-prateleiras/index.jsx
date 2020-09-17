import React, { useEffect } from "react";
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { requestUserBooks } from '../../../redux/actions'
import axios from 'axios'

const { Meta } = Card;

const Prateleiras = () => {

  const userId = useSelector((state) => state.session.user.id)
  const dispatch = useDispatch();

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

  const mudaPrateleira = () => {
    console.log("mudando")
    axios
    .put(`https://ka-users-api.herokuapp.com/users/501/books/711`,
    {
                
      "book": {
        "shelf": 3
      }
    
      
  },
      
    )
    .then(resp => {
      console.log(resp)
    

    })
    .catch((error) => { // erro no request
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
            onClick={() => mudaPrateleira(book.id) }
            cover={<img alt="example" src={book.image_url} />}
          >
            <Meta title={book.title} description="" />
            <button>  ---- LER ----   </button>
          </Card>

        </>
      ))}

      <h1> Estou Lendo</h1>
      {books.filter(({ shelf }) => shelf === 2).map((book, index) => (
        <>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src={book.image_url} />}
          >
            <Meta title={book.title} description="" />
          </Card>
        </>
      ))}

      <h1> Lido </h1>
      {books.filter(({ shelf }) => shelf === 3).map((book, index) => (
        <>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src={book.image_url} />}
          >
            <Meta title={book.title} description="" />
          </Card>
        </>
      ))}

    </div>
  )
}

export default Prateleiras;
