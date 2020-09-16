import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Div } from "../../styles/styles";
import { ListAntd } from "../../styles/styles";
import { Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'



const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Timeline = () => {
   const [listData, setData] = useState([]);
   //const listData = useSelector((state) => state.timeline) 
  const dispatch = useDispatch()
  const url = "https://ka-users-api.herokuapp.com/book_reviews"
  const getUser = useSelector((state) => state.session.user.user) // Nome usuario
  const getToken = useSelector((state) => state.session.token)  

  useEffect(() => {
    axios
      .get(url
         ,{ headers: { Authorization: getToken } }
      )
      .then(resp => {
    
        setData(resp.data)
       // dispatch(setList(resp.data))
      })
      .catch((error) => { // erro no request
        console.log(error)
      })
  }, [])

 
 

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
          dataSource={listData}
          footer={
            <div>
              <b>ant design</b> footer part
            </div>
          }
          renderItem={(item) => (
            <ListAntd.Item
              key={item.title}
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
                // console.log(item),
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
            </ListAntd.Item>
          )}
        />
      </div>
    </Div>
  );
};

export default Timeline;
