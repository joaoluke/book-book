import React, { useEffect, useState } from "react";
import { notification, Popover } from 'antd';
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
  StyledPrateleiraReviewContainer,
  StyledPrateleiraGrade,
  StyledPrateleiraText,
} from '../../styles/styles.js'
import { requestBookId } from '../../../redux/actions'

import axios from 'axios'


const Prateleiras = () => {
  const [show, setShow] = useState("")
  const [changeFeedback, setChangeFeedback] = useState("")
  const [changeGrade, setChangeGrade] = useState("")
  const getId = useSelector((state) => state.session.user.id);
  const getToken = useSelector((state) => state.session.token)

  //======================= Notificações

  const changeShelfNotification = type => {
    if (type === "success") {
      notification[type]({
        message: 'BookBook diz:',
        description:
          'Mudança feita com sucesso! Recarregue a pagina para ver o resultado!',
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
          'Feedback feito! Recarregue a pagina para ver o resultado!',
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


  const AddBookGradeNotification = type => {
    if (type === "success") {
      notification[type]({
        message: 'BookBook diz:',
        description:
          'Livro Avaliado! Recarregue a pagina para ver o resultado!',
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

  //======== Change Shelf ===============================

  const contentQueroLer = (book) => (
    <StyledPopoverContainer>
      <StyledPopover onClick={() => {
        const shelf = 2
        changeShelf(book, shelf)
      }
      }>Lendo</StyledPopover>
      <StyledPopover onClick={() => {
        const shelf = 3
        changeShelf(book, shelf)
      }
      }>Já li</StyledPopover>
    </StyledPopoverContainer>
  );

  const contentLendo = (book) => (
    <StyledPopoverContainer>
      <StyledPopover onClick={() => {
        const shelf = 1
        changeShelf(book, shelf)
      }
      }>Quero Ler</StyledPopover>
      <StyledPopover onClick={() => {
        const shelf = 3
        changeShelf(book, shelf)
      }
      }>Já li</StyledPopover>
    </StyledPopoverContainer>
  );

  const contentJali = (book, shelf = 1) => (
    <StyledPopoverContainer>
      <StyledPopover onClick={() => {
        const shelf = 1
        changeShelf(book, shelf)
      }
      }>Quero Ler</StyledPopover>
      <StyledPopover onClick={() => {
        const shelf = 2
        changeShelf(book, shelf)
      }
      }>Lendo</StyledPopover>
    </StyledPopoverContainer>
  );

  const changeShelf = (book, shelf) => {
    console.log(book)
    dispatch(requestBookId(book.id, userId, shelf))
    changeShelfNotification("success")
  }

  //============================ Change Review

  const onChangeReview = (e) => {
    setChangeFeedback(e.target.value)
  }

  const sendFeedback = (book) => {
    axios.put(`https://ka-users-api.herokuapp.com/users/${getId}/books/${book.id}`,
      {
        "book": {
          "review": changeFeedback
        }
      },
      { headers: { Authorization: getToken } }
    )
    setShow(false)
    AddBookFeedbackNotification("success")
  }


  const contentFeedback = (book) => (
    <StyledPopoverContainer>
      <StyledPopover onClick={() => { setShow(true) }}>Dar Feedback!</StyledPopover>
      {show === true && <><input onChange={onChangeReview} /><button onClick={() => sendFeedback(book)}>Send!</button>
      </>}
    </StyledPopoverContainer >
  );



  //======================= Change Grade

  const onChangeGrade = (e) => {
    setChangeGrade(e.target.value)
  }

  const sendGrade = (book) => {
    axios.put(`https://ka-users-api.herokuapp.com/users/${getId}/books/${book.id}`,
      {
        "book": {
          "grade": changeGrade
        }
      },
      { headers: { Authorization: getToken } }
    )
    setShow(false)
    AddBookGradeNotification("success")
  }


  const contentGrade = (book) => (
    <StyledPopoverContainer>
      <StyledPopover onClick={() => { setShow(true) }}>Dar Nota</StyledPopover>
      {show === true && <><input onChange={onChangeGrade} /><button onClick={() => sendGrade(book)}>Send!</button>
      </>}
    </StyledPopoverContainer >
  );


  // =================================
  const userId = useSelector((state) => state.session.user.id)
  const dispatch = useDispatch();
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
    <div>
      <StyledPrateleiraText>Suas Prateleiras</StyledPrateleiraText>
      <hr /> <hr />
      <h1> Quero Ler</h1>
      <StyledPrateleiraContainer>
        {books.filter(({ shelf }) => shelf === 1).map((book, index) => (
          <div key={index}>
            <StyledPrateleiraCard /*onClick={() => {
              dispatch(requestBookId(book.id, userId))
            }}*/>
              <div>
                <StyledPrateleiraImg src={book.image_url} />
                <StyledPrateleiraCardTitle>{book.title}</StyledPrateleiraCardTitle>
                <StyledPrateleiraCardAuthor>{book.author}</StyledPrateleiraCardAuthor>
                <StyledPrateleiraReviewContainer>
                  <Popover placement="right" content={contentGrade(book)} trigger="click">
                    {book.grade ? <StyledPrateleiraGrade>Av:{book.grade}/10</StyledPrateleiraGrade> :
                      <StyledPrateleiraGrade>Av:?/10</StyledPrateleiraGrade>}
                  </Popover>
                  <Popover placement="right" content={contentFeedback(book)} trigger="click">
                    {book.review ? <StyledPrateleiraReview>{book.review}</StyledPrateleiraReview> :
                      <StyledPrateleiraReview>Não Avaliado</StyledPrateleiraReview>}
                  </Popover>
                </StyledPrateleiraReviewContainer>
              </div>
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
            <div key={index}>
              <StyledPrateleiraCard /*onClick={() => {
                dispatch(requestBookId(book.id, userId))
              }}*/>
                <div>
                  <StyledPrateleiraImg src={book.image_url} />
                  <StyledPrateleiraCardTitle>{book.title}</StyledPrateleiraCardTitle>
                  <StyledPrateleiraCardAuthor>{book.author}</StyledPrateleiraCardAuthor>
                  <StyledPrateleiraReviewContainer>
                    <Popover placement="right" content={contentGrade(book)} trigger="click">
                      {book.grade ? <StyledPrateleiraGrade>Av:{book.grade}/10</StyledPrateleiraGrade> :
                        <StyledPrateleiraGrade>Av:?/10</StyledPrateleiraGrade>}
                    </Popover>
                    <Popover placement="right" content={contentFeedback(book)} trigger="click">
                      {book.review ? <StyledPrateleiraReview>{book.review}</StyledPrateleiraReview> :
                        <StyledPrateleiraReview>Não Avaliado</StyledPrateleiraReview>}
                    </Popover>
                  </StyledPrateleiraReviewContainer>
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
            <div key={index}>
              <StyledPrateleiraCard /*onClick={() => {
                dispatch(requestBookId(book.id, userId))
              }}*/>
                <div>
                  <StyledPrateleiraImg src={book.image_url} />
                  <StyledPrateleiraCardTitle>{book.title}</StyledPrateleiraCardTitle>
                  <StyledPrateleiraCardAuthor>{book.author}</StyledPrateleiraCardAuthor>
                  <StyledPrateleiraReviewContainer>
                    <Popover placement="right" content={contentGrade(book)} trigger="click">
                      {book.grade ? <StyledPrateleiraGrade>Av:{book.grade}/10</StyledPrateleiraGrade> :
                        <StyledPrateleiraGrade>Av:?/10</StyledPrateleiraGrade>}
                    </Popover>
                    <Popover placement="right" content={contentFeedback(book)} trigger="click">
                      {book.review ? <StyledPrateleiraReview>{book.review}</StyledPrateleiraReview> :
                        <StyledPrateleiraReview>Não Avaliado</StyledPrateleiraReview>}
                    </Popover>
                  </StyledPrateleiraReviewContainer>
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
