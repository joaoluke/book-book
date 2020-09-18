import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { Rate } from 'antd'; // avaliação estrelinhas
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Review = () => {
  const onFinish = (values) => {
    console.log(values.user.introduction);
    axios
    .put(`https://ka-users-api.herokuapp.com/users/501/books/711`,
      {        
        "book": {
          "review": values.user.introduction
        }
      },
      { headers: { Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1MDEsImV4cCI6MTYzMTc1MTY1MH0._PsIAKxrubeZQ2mRrq1mPLwgcJ0I8clteHuUvRDLBvE" } }
    )
    .then(resp => {
      console.log(resp)
    })
    .catch((error) => { 
      console.log(error)
    })

  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} >
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
        <Rate />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Review