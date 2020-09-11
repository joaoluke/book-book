import React from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd';
//import { StyledForm, StyledDiv, StyledRespDiv } from '../../styled/styledform/index.js'
import { requestLogin } from '../../../redux/actions'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()


  const onFinish = ({ user, password }) => {
    dispatch(requestLogin(user, password))
    history.push('/timeline')
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      > <div>Login</div>
        <Form.Item
          label="Username"
          name="user"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="name" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>

    </div>
  );
};

export default Login;
