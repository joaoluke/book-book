import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./style/index.css"
import { Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import axios from 'axios'
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
} from "../../styles/styles";
import { useDispatch, useSelector } from 'react-redux';
import { requestBooks } from '../../../redux/actions';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Timeline = () => {
  const getUser = useSelector((state) => state.session.user.user);
  const getId = useSelector((state) => state.session.user.id);
  const getToken = useSelector((state) => state.session.token);
  const getImage = useSelector((state) => state.session.user.image_url);
  const books = useSelector((state) => {
    return state.timeline;
  })
  const dispatch = useDispatch();
  const [listData, setData] = useState([]);
  const url = "https://ka-users-api.herokuapp.com/book_reviews"
  const token = window.localStorage.getItem("authToken")
  const [searchBook, setSearchBook] = useState("javascript");
  const [book, setBook] = useState([]);
  const addPrateleira = () => {
    "dispatch livro - adicionar o livro na api! "
  }


  useEffect(() => {
    dispatch(requestBooks(getId));
  }, [dispatch, getId])


  return (
    < Div >
      <img className="user-photo" src={getImage} width="100"/> 
      <h3 className="hello">Olá {getUser}, o que vai ler hoje?</h3>
      <div>
        <ListAntd
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
              console.log(listData)
            },
            pageSize: 5,
          }}
          dataSource={books}
          footer={
            <div>
              <b>ant design</b> footer part
            </div>
          }
          renderItem={(item) => {
            console.log(item)
            return (
              <ListAntd.Item>
                <StyledCardTimeline>
                  <StyledTimelineCardUserContainer>
                    {item.creator.image_url ?
                      <StyledTimelineCardAvatar> {item.creator.image_url}</StyledTimelineCardAvatar> :
                      <StyledTimelineCardAvatar> {item.creator.name[0].toUpperCase()} </StyledTimelineCardAvatar>}
                    <StyledTimelineCardUser>{item.creator.name}</StyledTimelineCardUser>
                  </StyledTimelineCardUserContainer>
                  <StyledTimelineCardTopText>
                    <StyledTimelineAuthor>Este livro foi escrito por: {item.author}</StyledTimelineAuthor>
                    {item.grade ? <div>Avaliação: {item.grade}/5</div> : <div>Não Avaliado</div>}
                  </StyledTimelineCardTopText>
                  <StyledTimelineImg src={item.image_url} />
                  <StyledTimelineCardTitle>
                    <h2>
                      {item.title}
                    </h2>
                  </StyledTimelineCardTitle>
                  {item.categories ? <StyledTimelineCardSubtitle> Categoria: {item.categories} </StyledTimelineCardSubtitle> :
                    <StyledTimelineCardSubtitle> Categoria: Não informado </StyledTimelineCardSubtitle>}


                  <StyledTimelineButton onClick={addPrateleira}> Adicionar à Prateleira</StyledTimelineButton>
                </StyledCardTimeline>
              </ListAntd.Item>

              /*key={item.title}
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
                console.log(item),
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src={item.image_url}
                />
              }
            >
              <ListAntd.Item.Meta
                avatar={<Avatar src={item.creator.image_url} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.review ? item.review : "Este livro ainda não tem uma avaliação"}
              />
              {item.content}
            </ListAntd.Item>*/
            )
          }}
        />
      </div>
    </Div >
  );
};

export default Timeline;



