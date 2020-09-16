import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Div } from "../../styles/styles";
import { ListAntd } from "../../styles/styles";
import { Avatar, Space } from "antd";
import { useDispatch, useSelector } from 'react-redux'
import { requestBooks } from '../../../redux/actions'



const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Timeline = () => {

  const userId = useSelector((state) => state.session.user.id)
  const dispatch = useDispatch()

  const url = "https://ka-users-api.herokuapp.com/book_reviews"
  const getUser = useSelector((state) => state.session.user.user) // Nome usuario

  useEffect(() => {
    userId && dispatch(requestBooks(userId))
  }, [userId])
 
  const books = useSelector((state) =>{
    return state.timeline
  }) 

  return (
    <Div>
      <h1>Olá {getUser}</h1>
      <p>Timeline</p>
      <div>
        <ListAntd
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              //console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={books} 
          footer={
            <div>
              <b>ant design</b> footer part
            </div>
          }
          renderItem={(item) => (
            <ListAntd.Item
               key={item.title}

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
            </ListAntd.Item>
          )}
        />
      </div>
    </Div>
  );
};

export default Timeline;
