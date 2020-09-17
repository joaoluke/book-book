import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'antd/dist/antd.css';
import { Div } from '../../styles/styles';
import { ListAntd } from '../../styles/styles';
import { Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios'


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function useBookSearch ()  {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [currentBooks, setCurrentBooks] = useState([]);

  const [ pageNumber, setPageNumber] = useState(1)

  const observer = useRef();
  const lastBookRefElement = useCallback(node => {
    console.log(node)
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log('visible')
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore]);

  useEffect(()=>{
    let beginning = 0
    let end = 40
    setCurrentBooks([...books].slice(beginning,end))
  }, [pageNumber])

  

  const url = 'https://ka-users-api.herokuapp.com/book_reviews'

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(url,
        { 
          headers: { 
            Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5OTgsImV4cCI6MTYzMTIxMDE3NH0.YKpX8EiI9qVJyEG05hAUM9UdRqVy6EYYa8nyCPA2X6M'
          }, 
          params: { 
            page: pageNumber 
          } 
        })
      .then(resp => {
        setBooks(resp.data)
        setHasMore(resp.data.length > 0)
        setLoading(false)
        setCurrentBooks([...resp.data].slice(0,20))
      })
      .catch((error) => {
        console.log(error)
        setError(true)
      })
  }, [pageNumber])

  return (
    <Div>
      <h1>Olá User,</h1>
      <p>Que livro você quer ler hoje?</p>
      <div>
        {currentBooks.map((book, index) => {
          if (books.length === index + 1) {
            return <div ref={lastBookRefElement} key={index}>oi</div>
          } else {
            return <div key={book}>oi</div>
          }
        })}

      </div>
      <h1>{loading && 'Loading...'}</h1>
      <h1>{error && 'Error to request'}</h1>
    </Div>
  );
};
