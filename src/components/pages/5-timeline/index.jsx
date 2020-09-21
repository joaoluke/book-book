import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Popover, notification } from "antd";


import {
  Div,
  ListAntd,
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
import { useDispatch, useSelector } from 'react-redux';
import { requestBooks, postUserBooks } from '../../../redux/actions';

const Timeline = () => {
  const getUser = useSelector((state) => state.session.user.user)
  const getId = useSelector((state) => state.session.user.id);
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

  useEffect(() => {
    dispatch(requestBooks(getId));

  }, [dispatch, getId])

  return (
    < Div >
      <StyledTimelineTitle>Olá {getUser}!</StyledTimelineTitle>
      <StyledTimelineText>Timeline</StyledTimelineText>
      <div>
        <ListAntd
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              // console.log(page);
              // console.log(listData)
            },
            pageSize: 5,
          }}
          dataSource={books}
          renderItem={(item) => {
            //console.log(item)
            return (
              <StyledTimelineContainer>
                <StyledCardTimeline>
                  <StyledTimelineCardUserContainer>
                    {item.creator.image_url ?
                      <StyledTimelineCardAvatar> {item.creator.image_url}</StyledTimelineCardAvatar> : (
                        item.creator.user ?
                          <StyledTimelineCardAvatar> {item.creator.user[0].toUpperCase()} </StyledTimelineCardAvatar> :
                          <StyledTimelineCardAvatar>U</StyledTimelineCardAvatar>)}
                    <StyledTimelineCardUser>{item.creator.user}</StyledTimelineCardUser>
                  </StyledTimelineCardUserContainer>
                  <StyledTimelineCardTopText>
                    <StyledTimelineAuthor>Este livro foi escrito por: {item.author}</StyledTimelineAuthor>
                    {item.grade ? <div>Avaliação: {item.grade}/10</div> : <div>Não Avaliado</div>}
                  </StyledTimelineCardTopText>
                  <StyledTimelineImg src={item.image_url} />
                  <StyledTimelineCardTitle>
                    <h2>
                      {item.title}
                    </h2>
                  </StyledTimelineCardTitle>
                  {item.categories ? <StyledTimelineCardSubtitle> Categoria: {item.categories} </StyledTimelineCardSubtitle> :
                    <StyledTimelineCardSubtitle> Categoria: Não informado </StyledTimelineCardSubtitle>}

                  <Popover placement="right" content={content(item)} trigger="click">
                    <StyledTimelineButton onClick={() => console.log(item)}> Adicionar</StyledTimelineButton>
                  </Popover>
                </StyledCardTimeline>
              </StyledTimelineContainer>
            )
          }}
        />
      </div>
    </Div >
  );
};

export default Timeline;
