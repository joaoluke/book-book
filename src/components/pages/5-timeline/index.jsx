import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'antd/dist/antd.css';
import { useSelector, useDispatch} from 'react-redux';
import { Div } from '../../styles/styles';
import { ListAntd } from '../../styles/styles';
import "./style/index.css";
import { Avatar, Space, Popover, notification } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import axios from 'axios'
import {
  StyledCardTimeline,
  StyledTimelineCardTopText,
  StyledTimelineImg,
  StyledTimelineCardTitle,
  StyledTimelineCardSubtitle,
  StyledTimelineButton,
  StyledTimelineCardUserContainer,
  StyledTimelineCardUser,
  StyledTimelineCardAvatar,
  StyledTimelineAuthor,
  StyledPopover,
  StyledPopoverContainer,
  StyledTimelineText,
  StyledTimelineContainer,
  StyledTimelineTitle,
} from "../../styles/styles";
import { requestBooks, postUserBooks } from '../../../redux/actions';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
export default function Timeline ()  {
  const [hasMore, setHasMore] = useState(false);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [ pageNumber, setPageNumber] = useState(1)


  const getUser = useSelector((state) => state.session.user.user)
  const getId = useSelector((state) => state.session.user.id);
  const getImage = useSelector((state) => state.session.user.image_url);
  const getToken = useSelector((state) => state.session.token)
  const books = useSelector((state) => {
    return state.timeline;
  })

  const openNotificationWithIcon = type => {
    if (type === "success") {
      notification[type]({
        message: 'BookBook diz:',
        description:
          'Livro adicionado à prateleira!',
      });
    }
    else {
      notification[type]({
        message: 'BookBook diz:',
        description:
          'Erro! tente novamente.',
      });
    }
  };


  const content = (book) => (
    <StyledPopoverContainer>
      <StyledPopover onClick={() => addBook({ ...book, shelf: 1 })}>Quero Ler</StyledPopover>
      <StyledPopover onClick={() => addBook({ ...book, shelf: 2 })}>Lendo</StyledPopover>
      <StyledPopover onClick={() => addBook({ ...book, shelf: 3 })}>Já li</StyledPopover>
    </StyledPopoverContainer>
  );

  const dispatch = useDispatch();
  // console.log(getUser)
  // console.log(getId)
  // console.log(getToken)
  const [listData, setData] = useState([]);
  const url = "https://ka-users-api.herokuapp.com/book_reviews"
  const token = window.localStorage.getItem("authToken")
  const [searchBook, setSearchBook] = useState("javascript");
  const [book, setBook] = useState([]);
  const loading = books.length === 0;
  const addPrateleira = () => {
    console.log(books)
  }

  const addBook = (book) => {
    console.log(book)
    const values = {
      book: {
        author: book.author,
        categories: book.categories,
        google_book_id: book.google_book_id,
        grade: book.grade,
        id: book.id,
        image_url: book.image_url,
        review: book.review,
        shelf: book.shelf,
        title: book.title,
      }
    }
    console.log(values)
    dispatch(postUserBooks(values))
    openNotificationWithIcon('success')
  }

  const observer = useRef();
  const lastBookRefElement = useCallback(node => {
    console.log(node)
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore]);
  console.log(pageNumber)
  useEffect(() => {
    dispatch(requestBooks());
  }, [dispatch])

  useEffect(()=>{
    if (loading) return
    let beginning = 0;
    let end = currentBooks.length + 6;
    setCurrentBooks([...books].slice(beginning,end));
    setHasMore(books.length !== currentBooks.length)
  }, [pageNumber, loading])


  return (
    < Div >
      <img className="user-photo" src={getImage} width="100"/> 
      <h3 className="hello">Olá {getUser}, o que vai ler hoje?</h3>
      <div>
        {currentBooks.map((book, index) => {
          if (currentBooks.length === index + 1) {
            return (
              <div ref={lastBookRefElement}>
              <ListAntd.Item >
                <StyledCardTimeline>
                  <StyledTimelineCardUserContainer>
                    {book.creator.image_url ?
                      <StyledTimelineCardAvatar src={book.creator.image_url}> </StyledTimelineCardAvatar> :
                      <StyledTimelineCardAvatar> {book.creator.name[0].toUpperCase()} </StyledTimelineCardAvatar>}
                    <StyledTimelineCardUser>{book.creator.name}</StyledTimelineCardUser>
                  </StyledTimelineCardUserContainer>
                  <StyledTimelineCardTopText>
                    <StyledTimelineAuthor>Este livro foi escrito por: {book.author}</StyledTimelineAuthor>
                    {book.grade ? <div>Avaliação: {book.grade}/10</div> : <div>Não Avaliado</div>}
                  </StyledTimelineCardTopText>
                  <StyledTimelineImg src={book.image_url} />
                  <StyledTimelineCardTitle>
                    <h2>
                      {book.title}
                    </h2>
                  </StyledTimelineCardTitle>
                {book.categories ? <StyledTimelineCardSubtitle> Categoria: {book.categories} </StyledTimelineCardSubtitle> :
                  <StyledTimelineCardSubtitle> Categoria: Não informado </StyledTimelineCardSubtitle>}

                  <Popover placement="right" content={content(book)} trigger="click">
                    <StyledTimelineButton onClick={() => console.log(book)}> Adicionar</StyledTimelineButton>
                  </Popover>
                </StyledCardTimeline>
              </ListAntd.Item>
              </div>
              )
          } else {
            return (
              <ListAntd.Item>
              <StyledCardTimeline>
                <StyledTimelineCardUserContainer>
                  {book.creator.image_url ?
                    <StyledTimelineCardAvatar> </StyledTimelineCardAvatar> :
                    <StyledTimelineCardAvatar> {book.creator.name[0].toUpperCase()} </StyledTimelineCardAvatar>}
                  <StyledTimelineCardUser>{book.creator.name}</StyledTimelineCardUser>
                </StyledTimelineCardUserContainer>
                <StyledTimelineCardTopText>
                  <StyledTimelineAuthor>Este livro foi escrito por: {book.author}</StyledTimelineAuthor>
                  {book.grade ? <div>Avaliação: {book.grade}/10</div> : <div>Não Avaliado</div>}
                </StyledTimelineCardTopText>
                <StyledTimelineImg src={book.image_url} />
                <StyledTimelineCardTitle>
                  <h2>
                    {book.title}
                  </h2>
                </StyledTimelineCardTitle>
              {book.categories ? <StyledTimelineCardSubtitle> Categoria: {book.categories} </StyledTimelineCardSubtitle> :
                <StyledTimelineCardSubtitle> Categoria: Não informado </StyledTimelineCardSubtitle>}

                  <Popover placement="right" content={content(book)} trigger="click">
                    <StyledTimelineButton onClick={() => console.log(book)}> Adicionar</StyledTimelineButton>
                  </Popover>
              </StyledCardTimeline>
              </ListAntd.Item>
              )
          }
        })}
          
      </div>
    </Div>
  );
};
