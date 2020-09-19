import React, { useEffect, useState } from "react";
import { Card, notification, Popover, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { requestUserBooks } from '../../../redux/actions'
import {
  StyledPrateleiraCard,
  StyledPrateleiraImg,
  StyledPrateleiraCardTitle,
  StyledPrateleiraCardAuthor,
  StyledPrateleiraCardButton,
  StyledPrateleiraContainer,
  StyledPopover,
  StyledPopoverContainer,
  StyledPrateleiraReview,
} from '../../styles/styles.js'
import { requestBookId } from '../../../redux/actions'
import Review from "../review"


const { Meta } = Card;
let shelf = 1
const Prateleiras = () => {
  const [show, setShow] = useState("")
  const [changeFeedback, setChangeFeedback] = useState("")

  //=======================

  const changeShelfNotification = type => {
    if (type === "success") {
      notification[type]({
        message: 'BookBook diz:',
        description:
          'Mudança feita com sucesso!',
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

  const AddBookFeedbackNotification = type => {
    if (type === "success") {
      notification[type]({
        message: 'BookBook diz:',
        description:
          'Feedback feito!',
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


  const contentQueroLer = (book) => (
    <StyledPopoverContainer>
      <StyledPopover onClick={() => changeShelf({ ...book, shelf: 2 })}>Lendo</StyledPopover>
      <StyledPopover onClick={() => changeShelf({ ...book, shelf: 3 })}>Já li</StyledPopover>
    </StyledPopoverContainer>
  );

  const contentLendo = (book) => (
    <StyledPopoverContainer>
      <StyledPopover onClick={() => changeShelf({ ...book, shelf: 1 })}>Quero Ler</StyledPopover>
      <StyledPopover onClick={() => changeShelf({ ...book, shelf: 3 })}>Já li</StyledPopover>
    </StyledPopoverContainer>
  );

  const contentJali = (book) => (
    <StyledPopoverContainer>
      <StyledPopover onClick={() => changeShelf({ ...book, shelf: 1 })}>Quero Ler</StyledPopover>
      <StyledPopover onClick={() => changeShelf({ ...book, shelf: 2 })}>Lendo</StyledPopover>
    </StyledPopoverContainer>
  );

  const onChange = (e) => {
    setChangeFeedback(e.target.value)
  }

  const sendFeedback = () => {
    /*dispatch(state)*/
    setShow(false)
    AddBookFeedbackNotification("success")
  }


  const contentFeedback = () => (
    <StyledPopoverContainer>
      <StyledPopover onClick={() => { setShow(true) }}>Dar Feedback!</StyledPopover>
      {show === true && <><input onChange={onChange} /><button onClick={sendFeedback}>Send!</button>
      </>}
    </StyledPopoverContainer >
  );


  const changeShelf = () => (
    changeShelfNotification("success")
  )
  //=======================

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
  useEffect(() =>
    console.log(books)
    , [books])
  if (books.length <= 0) {
    return <div> carregando </div>
  }

  //-----------------------------------------------------------------------
  return (
    <div> PRATELEIRAS
      <hr /> <hr />
      <h1> Quero Ler</h1>
      <StyledPrateleiraContainer>
        {books.filter(({ shelf }) => shelf === 1).map((book, index) => (
          <div>
            <StyledPrateleiraCard onClick={() => {
              dispatch(requestBookId(book.id, userId))
            }}>
              <div>
                <StyledPrateleiraImg src={book.image_url} />
                <StyledPrateleiraCardTitle>{book.title}</StyledPrateleiraCardTitle>
                <StyledPrateleiraCardAuthor>{book.author}</StyledPrateleiraCardAuthor>

              </div>
              <Popover placement="right" content={contentFeedback(book)} trigger="click">
                {book.review ? <StyledPrateleiraReview>{book.review}</StyledPrateleiraReview> :
                  <StyledPrateleiraReview>Não Avaliado</StyledPrateleiraReview>}
              </Popover>
              <Popover placement="right" content={contentQueroLer(book)} trigger="click">
                <StyledPrateleiraCardButton>Mudar Prateleira</StyledPrateleiraCardButton>
              </Popover>
            </StyledPrateleiraCard>

          </div>
        ))
        }
      </StyledPrateleiraContainer>
      <hr /> <hr />
      <h1> Estou Lendo</h1>
      <StyledPrateleiraContainer>
        {
          books.filter(({ shelf }) => shelf === 2).map((book, index) => (
            <div>
              <StyledPrateleiraCard onClick={() => {
                dispatch(requestBookId(book.id, userId))
              }}>
                <div>
                  <StyledPrateleiraImg src={book.image_url} />
                  <StyledPrateleiraCardTitle>{book.title}</StyledPrateleiraCardTitle>
                  <StyledPrateleiraCardAuthor>{book.author}</StyledPrateleiraCardAuthor>
                  <Popover placement="right" content={contentFeedback(book)} trigger="click">
                    {book.review ? <StyledPrateleiraReview>{book.review}</StyledPrateleiraReview> :
                      <StyledPrateleiraReview>Não Avaliado</StyledPrateleiraReview>}
                  </Popover>
                </div>
                <Popover placement="right" content={contentLendo(book)} trigger="click">
                  <StyledPrateleiraCardButton>Mudar Prateleira</StyledPrateleiraCardButton>
                </Popover>
              </StyledPrateleiraCard>

            </div>
          ))
        }
      </StyledPrateleiraContainer>
      <hr /> <hr />
      <h1> Lido </h1>
      <StyledPrateleiraContainer>
        {
          books.filter(({ shelf }) => shelf === 3).map((book, index) => (
            <div>
              <StyledPrateleiraCard onClick={() => {
                dispatch(requestBookId(book.id, userId))
              }}>
                <div>
                  <StyledPrateleiraImg src={book.image_url} />
                  <StyledPrateleiraCardTitle>{book.title}</StyledPrateleiraCardTitle>
                  <StyledPrateleiraCardAuthor>{book.author}</StyledPrateleiraCardAuthor>
                  <Popover placement="right" content={contentFeedback(book)} trigger="click">
                    {book.review ? <StyledPrateleiraReview>{book.review}</StyledPrateleiraReview> :
                      <StyledPrateleiraReview>Não Avaliado</StyledPrateleiraReview>}
                  </Popover>
                </div>
                <Popover placement="right" content={contentJali(book)} trigger="click">
                  <StyledPrateleiraCardButton>Mudar Prateleira</StyledPrateleiraCardButton>
                </Popover>
              </StyledPrateleiraCard>

            </div>
          ))
        }
      </StyledPrateleiraContainer>

    </div >
  )
}

export default Prateleiras;
