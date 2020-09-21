import React, { useState, useEffect } from "react";
import "../../../App.css"
import {
  Popover,
  notification,
  Modal
} from "antd";
import {
  StyledH1,
  StyledBodySearch,
  StyledInputSearch,
  StyledBuscaCard,
  StyledBuscaImg,
  StyledBuscaCardTextContainer,
  StyledBuscaCardTitle,
  StyledBuscaCardAuthor,
  StyledBuscaCardDescription,
  StyledBuscaCardButton,
  StyledBuscaCardTopTextContainer,
  StyledBuscaCardButtonContainer,
  StyledPopover,
  StyledPopoverContainer,
} from '../../styles/styles.js'
import { useDispatch } from 'react-redux';
import { postUserBooks } from '../../../redux/actions';



const Busca = () => {
  const dispatch = useDispatch()
  const [book, setBook] = useState([]);
  const [bookModal, setBookModal] = useState(null);
  const [visible, setVisible] = useState(false);
  const [searchBook, setSearchBook] = useState("javascript");

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


  const addBook = (book) => {
    console.log(book)
    const values = {
      book: {
        author: book.volumeInfo.authors.join(""),
        categories: (book.volumeInfo.categories ? book.volumeInfo.categories.join("") : ""),
        google_book_id: book.id,
        grade: book.volumeInfo.averageRating,
        id: "?",
        image_url: book.volumeInfo.imageLinks.thumbnail,
        review: "",
        shelf: book.shelf,
        title: book.volumeInfo.title,
      }
    }
    dispatch(postUserBooks(values))
    openNotificationWithIcon('success')
  }

  const content = (book) => (
    <StyledPopoverContainer>
      <StyledPopover onClick={() => addBook({ ...book, shelf: 1 })}>Quero Ler</StyledPopover>
      <StyledPopover onClick={() => addBook({ ...book, shelf: 2 })}>Lendo</StyledPopover>
      <StyledPopover onClick={() => addBook({ ...book, shelf: 3 })}>Já li</StyledPopover>
    </StyledPopoverContainer>
  );

  const handleClick = (book) => {
    console.log("Chamou", book);
    setBookModal(book);
    setVisible(true);
  };

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchBook}`)
      .then((response) => response.json())
      .then(({ items }) => {
      
        setBook(items)
      });

  }, [searchBook]);

  return (
    <StyledBodySearch>
      <StyledH1>Busque o livro desejado</StyledH1>
      <StyledInputSearch
        placeholder="Nome do Livro"
        enterButton="Buscar"
        size="large"
        onSearch={(value) => setSearchBook(value)}
      />
      {book &&
        book.map((book, index) => (
          
          <StyledBuscaCard key={index}>
            <a >
              <div onClick={() => {
                handleClick(book); 
              }}>
                <StyledBuscaImg src={
                  "https://books.google.com/books/content?id=" +
                  book.id +
                  "&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api"
                } />
              </div>
            </a>
            <StyledBuscaCardTextContainer>
              <StyledBuscaCardTopTextContainer>
                <div>
                  <StyledBuscaCardTitle>{book.volumeInfo.title}</StyledBuscaCardTitle>
                  {book.volumeInfo.authors ?
                    <StyledBuscaCardAuthor>{book.volumeInfo.authors.join("")}</StyledBuscaCardAuthor> :
                    <StyledBuscaCardAuthor>Autor não informado</StyledBuscaCardAuthor>}
                </div>
                <StyledBuscaCardButtonContainer>
                  <Popover placement="right" content={content(book)} trigger="click">
                    <StyledBuscaCardButton >Adicionar</StyledBuscaCardButton>
                  </Popover>

                </StyledBuscaCardButtonContainer>
              </StyledBuscaCardTopTextContainer>
              <StyledBuscaCardDescription>Descrição: {book.volumeInfo.description}</StyledBuscaCardDescription>
            </StyledBuscaCardTextContainer>
            
          </StyledBuscaCard>
          
        ))}
        {bookModal && (
          <Modal
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
          >
            {bookModal ? <p>{bookModal.volumeInfo.title}</p> : <p>Livro sem título</p>}
            {bookModal ? <p>{bookModal.volumeInfo.subtitle}</p> : <p>Livro sem sub-título</p>}
            {bookModal ? <p>{bookModal.volumeInfo.description}</p> : <p>Livro sem descrição</p>}
            {bookModal ? <img src={bookModal.volumeInfo.imageLinks.thumbnail}/> : <img src={bookModal.volumeInfo.imageLinks.smallThumbnail}/>}
            {bookModal ? <p>{bookModal.volumeInfo.authors[0]}</p> : <p>Autor desconhecido</p>}
          </Modal>
        )}
        
      { /*<StyledCardSearch
            key={index}
            style={{ width: 250 }}
            cover={
              <img
                alt={book.volumeInfo.title}
                src={
                  "https://books.google.com/books/content?id=" +
                  book.id +
                  "&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api"
                }
              />
            }
            actions={[
              <Button
                type="text"
                key="add"
              // onClick={() =>
              //   console.log({
              //     title: book.volumeInfo.title,
              //     autor: book.volumeInfo.authors,
              //     image_url:
              //       "https://books.google.com/books/content?id=" +
              //       book.id +
              //       "&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
              //     categories: "tecnologia",
              //     google_book_id: book.id,
              //   })
              // }
              >
                Adicionar
              </Button>,
            ]}
          >
            <StyledCardSearch.Meta
              title={book.volumeInfo.title}
              description={book.volumeInfo.authors}
            />
          </StyledCardSearch> */}

    </StyledBodySearch>
  );
};

export default Busca;
