import React, { useState, useEffect } from "react";
import "../../../App.css"
import { Input, Typography, Button, Popover } from "antd";
import {
  StyledH1,
  StyledBodySearch,
  StyledInputSearch,
  StyledCardSearch,
  StyledBuscaCard,
  StyledBuscaImg,
  StyledBuscaCardTextContainer,
  StyledBuscaCardTitle,
  StyledBuscaCardAuthor,
  StyledBuscaCardYear,
  StyledBuscaCardDescription,
  StyledBuscaCardButton,
  StyledTimelineCardSubtitle,
  StyledBuscaCardTopTextContainer,
  StyledBuscaCardButtonContainer,
  StyledPopover,
  StyledPopoverContainer,
} from '../../styles/styles.js'



const Busca = () => {
  const [book, setBook] = useState([]);
  const [searchBook, setSearchBook] = useState("javascript");


  const queroLer = () => {
    console.log("quero ler")
  }

  const lendo = () => {
    console.log("lendo")
  }

  const jali = () => {
    console.log("ja li")
  }


  const content = (
    <StyledPopoverContainer>
      <StyledPopover onClick={queroLer} >Quero Ler</StyledPopover>
      <StyledPopover onClick={lendo}>Quero Ler</StyledPopover>
      <StyledPopover onClick={jali}>Quero Ler</StyledPopover>
    </StyledPopoverContainer>
  );

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchBook}`)
      .then((response) => response.json())
      .then(({ items }) => {
        console.log(items)
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
            <div>
              <StyledBuscaImg src={
                "https://books.google.com/books/content?id=" +
                book.id +
                "&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api"
              } />
            </div>
            <StyledBuscaCardTextContainer>
              <StyledBuscaCardTopTextContainer>
                <div>
                  <StyledBuscaCardTitle>{book.volumeInfo.title}</StyledBuscaCardTitle>
                  <StyledBuscaCardAuthor>{book.volumeInfo.authors.join("")}</StyledBuscaCardAuthor>
                </div>
                <StyledBuscaCardButtonContainer>
                  <Popover placement="right" content={content} trigger="click">
                    <StyledBuscaCardButton>Adicionar</StyledBuscaCardButton>
                  </Popover>

                </StyledBuscaCardButtonContainer>
              </StyledBuscaCardTopTextContainer>
              <StyledBuscaCardDescription>Descrição:{book.searchInfo.textSnippet}</StyledBuscaCardDescription>
            </StyledBuscaCardTextContainer>
          </StyledBuscaCard>
        ))}
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
