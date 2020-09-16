import React from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Button, Checkbox, Input } from 'antd';
//import { StyledForm, StyledDiv, StyledRespDiv } from '../../styled/styledform/index.js'
import { requestLogin } from '../../../redux/actions';
import { LoginForm, LoginButton } from '../../styles/styles'

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
      <LoginForm
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Usuário"
          name="user"
          rules={[{ required: true, message: 'Digite seu nome de usuário!' }]}
        >
          <Input placeholder="name" />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: 'Digite sua senha!' }]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Lembre-me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <LoginButton type="primary" htmlType="submit">
            Submit
          </LoginButton>
        </Form.Item>
      </LoginForm>

    </div>
  );
};

export default Login;
