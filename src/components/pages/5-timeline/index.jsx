import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Div } from "../../styles/styles";
import { ListAntd } from "../../styles/styles";
import { Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import axios from 'axios'


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Timeline = () => {
  const [listData, setData] = useState([]);
  const url = "https://ka-users-api.herokuapp.com/book_reviews"

  useEffect(() => {
    axios
      .get(url,
        { headers: { Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5OTgsImV4cCI6MTYzMTIxMDE3NH0.YKpX8EiI9qVJyEG05hAUM9UdRqVy6EYYa8nyCPA2X6M" } }
      )
      .then(resp => {
        console.log("title: " + resp.data[1].title)
        console.log("review: " + resp.data[1].review)
        console.log("url: " + resp.data[1].image_url)
        setData(resp.data)
      })
      .catch((error) => { // erro no request
        console.log(error)
      })
  }, [])

  return (
    <Div>
      <h1>Olá User,</h1>
      <p>Timeline</p>
      <div>
        <ListAntd
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
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
            </ListAntd.Item>
          )}
        />
      </div>
    </Div>
  );
};

export default Timeline;
