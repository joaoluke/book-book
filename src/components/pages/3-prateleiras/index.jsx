import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card, Button } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import { Div } from "../../styles/styles";
import Header from '../../header';
const { Meta } = Card;


const Shelf = () => {
  const [size, setSize] = useState({})
  const [data, setData] = useState([])
  const [shelf1, setShelf1] = useState([]);
  const [shelf2, setShelf2] = useState([]);
  const [shelf3, setShelf3] = useState([]);
  const [shelfVisible, setShelfVisible] = useState([])

  const filter = () => {
    data.map(book => {
      console.log(book)
      if (book.shelf === 3) setShelf1(prevState => [...prevState, {currentOrNewKey: book}]);
    })
  }

  const url = `https://ka-users-api.herokuapp.com/users/501/books/`

  useEffect(() => {
    axios
    .get(url,
      { 
        headers: { 
          Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5OTgsImV4cCI6MTYzMTIxMDE3NH0.YKpX8EiI9qVJyEG05hAUM9UdRqVy6EYYa8nyCPA2X6M'
        }
      })
    .then(resp => {
      setData(resp.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, []);

  const wantToRead = () => {
    filter()
    
  }

  const alreadyRead = () => {
    console.log(shelf1)
  }

  const reading = () => {

  }

  return (
    <>
      <Header />
      <Button onClick={wantToRead} type="primary" shape="round" size={size}>
        Quero Ler
      </Button>
      <Button onClick={alreadyRead} type="primary" shape="round" size={size}>
        Estou Lendo
      </Button>
      <Button onClick={reading} type="primary" shape="round" size={size}>
        Já Lido
      </Button>
      <Div>
          <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
              <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
      </Div>
    </>
  );
};

export default Shelf;