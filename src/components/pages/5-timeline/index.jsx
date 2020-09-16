import React, { useState, useEffect, useRef, useCallback } from "react";
import "antd/dist/antd.css";
import { Div } from "../../styles/styles";
import { ListAntd } from "../../styles/styles";
import { Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
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

  const [ pageNumber, setPageNumber] = useState(1)

  const observer = useRef();
  const lastBookRefElement = useCallback(node => {
    console.log(node)
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore]);

  

  const url = "https://ka-users-api.herokuapp.com/book_reviews"

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(url,
        { 
          headers: { 
            Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5OTgsImV4cCI6MTYzMTIxMDE3NH0.YKpX8EiI9qVJyEG05hAUM9UdRqVy6EYYa8nyCPA2X6M"
          }, 
          params: { 
            page: pageNumber 
          } 
        })
      .then(resp => {
        // console.log("title: " + resp.data[1].title)
        // console.log("review: " + resp.data[1].review)
        // console.log("url: " + resp.data[1].image_url)
        console.log(resp.data.length)
        setBooks(resp.data)
        setHasMore(resp.data.length > 0)
        setLoading(false)
      })
      .catch((error) => { // erro no request
        console.log(error)
        setError(true)
      })
  }, [pageNumber])

  return (
    <Div>
      <h1>Olá User,</h1>
      <p>Timeline</p>
      <div>
        <ListAntd
          itemLayout="vertical"
          size="large"
          dataSource={books}
          
          renderItem={(item) => (
              <ListAntd.Item
                key={item.title}
                
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text="156"
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src={item.image_url}
                  />
                }
              >
                {books.map((book, index) => {

                  return (
                    <div>
                    <ListAntd.Item.Meta
                  
                      avatar={<Avatar src={book.creator.image_url} />}
                      title={<a href={book.href}>{book.title}</a>}
                      description={book.review ? book.review : "Este livro ainda não tem uma avaliação"}
                    />
                    </div>
                  )
                  }
                )}
                
                {item.content}
                
              </ListAntd.Item>
          )}
        />
      </div>
      <h1>{loading && "Loading..."}</h1>
      <h1>{error && "Error to request"}</h1>
    </Div>
  );
};
