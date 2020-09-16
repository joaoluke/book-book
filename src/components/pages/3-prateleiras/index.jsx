import React, {useEffect} from "react";


// import './index.css';
import { Card } from 'antd';

import { useDispatch, useSelector } from 'react-redux'
import {requestUserBooks} from '../../../redux/actions'

const { Meta } = Card;


const  Prateleiras = () => {

  const userId = useSelector((state) => state.session.user.id)
  const dispatch = useDispatch();

  useEffect(() => {

    userId && dispatch(requestUserBooks(userId))
    

}, [userId])
  
  const books = useSelector((state) =>{
    return state.books
  }) 

  if (books.length<=0){
    return <div> carregando </div>
  }
  return (
    <div> PRATELEIRAS
      <h1> Quero Ler</h1>
      {books.filter(({shelf}) => shelf === 1).map((book, index) => (
        <>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src={book.image_url} />}
          >
            <Meta title={book.title} description="" />
            
          </Card>
          <button>  ---- LER ----   </button>
        </>  
      ))} 

      <h1> Estou Lendo</h1>
      {books.filter(({shelf}) => shelf === 2).map((book, index) => (
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
      {books.filter(({shelf}) => shelf === 3).map((book, index) => (
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
