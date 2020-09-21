import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";

import { Space } from "antd";
import { residences } from '../1-registration/residence'
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import axios from 'axios'
import {
  StyledProfileH4,
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
  const getName = useSelector((state) => state.session.user.name);
  const getUser = useSelector((state) => state.session.user.user);
  const getId = useSelector((state) => state.session.user.id);
  const getAddress = useSelector((state) => state.session.user.address);
  const getToken = useSelector((state) => state.session.token);
  const getImage = useSelector((state) => state.session.user.image_url);
  const [book, setBooks] = useState([])
  console.log(book)
  const dispatch = useDispatch();
  const [listData, setData] = useState([]);
  const url = "https://ka-users-api.herokuapp.com/book_reviews"
  const token = window.localStorage.getItem("authToken")



  const getCity = () => {
    for (let i = 0; i < residences.length; i++) {
      for (let j = 0; j < residences[i].children.length; j++) {
        for (let k = 0; k < residences[i].children[j].children.length; k++) {
          if (residences[i].children[j].children[k].value === parseInt(getAddress)) {
            console.log(residences[i].children[j].children[k].value)
            return (
              residences[i].children[j].children[k].label 
              + ", " + 
              residences[i].children[j].children[k].state
            )
          }
        }
      }
    }
  }

  useEffect (() => {
    axios.get(`https://ka-users-api.herokuapp.com/users/${getId}/books`,
      { headers: { Authorization: getToken } }
    )
    .then(resp => setBooks(resp.data))
  }, [])

  useEffect(() => {
    dispatch(requestBooks(getId));
  }, [dispatch, getId])


  return (
    < Div >
      <img className="user-photo" src={getImage} width="100"/> 
      <h3 className="hello">{getName}</h3>
      <StyledProfileH4>{getCity()}</StyledProfileH4>
      <h3>Livros que {getUser} gosta de ler</h3>
      <div>
        <ListAntd
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
            },
            pageSize: 5,
          }}
          dataSource={book}
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
                      <StyledTimelineCardAvatar src={item.creator.image_url}></StyledTimelineCardAvatar> :
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

                </StyledCardTimeline>
              </ListAntd.Item>

            )
          }}
        />
      </div>
    </Div >
  );
};

export default Timeline;



