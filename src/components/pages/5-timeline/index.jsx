import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'antd/dist/antd.css';
import { useSelector, useDispatch} from 'react-redux';
import { Div } from '../../styles/styles';
import { ListAntd } from '../../styles/styles';
import { requestBooks } from '../../../redux/actions';
import "antd/dist/antd.css";
import "./style/index.css"
import { Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import axios from "axios";
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
} from "../../styles/styles";
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
export default function useBookSearch ()  {
  const [hasMore, setHasMore] = useState(false);
  
  const [ pageNumber, setPageNumber] = useState(1)

  const getUser = useSelector((state) => state.session.user.user);
  const getImage = useSelector((state) => state.session.user.image_url);
  const books = useSelector((state) => {
    return state.timeline;
  })
  const [currentBooks, setCurrentBooks] = useState([]);
  const loading = books.length === 0;

  const dispatch = useDispatch();

  const addShelf = () => {
    console.log("addShelf")
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
                      <StyledTimelineCardAvatar> {book.creator.image_url}</StyledTimelineCardAvatar> :
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


                  <StyledTimelineButton onClick={addShelf}> Adicionar à Prateleira</StyledTimelineButton>
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
                    <StyledTimelineCardAvatar> {book.creator.image_url}</StyledTimelineCardAvatar> :
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


                <StyledTimelineButton onClick={addShelf}> Adicionar à Prateleira</StyledTimelineButton>
              </StyledCardTimeline>
              </ListAntd.Item>
              )
          }
        })}

      </div>
      <h1>{loading && 'Loading...'}</h1>
    </Div>
  );
};
