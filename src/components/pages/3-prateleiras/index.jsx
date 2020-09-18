import React, { useEffect } from "react";
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { requestUserBooks } from '../../../redux/actions'

import { requestBookId} from '../../../redux/actions'
import Review from "../review"


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
  }, [dispatch, userId, bookId])

  const books = useSelector((state) => {
    return state.books
  })

  if (books.length <= 0) {
    return <div> carregando </div>
  }

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
