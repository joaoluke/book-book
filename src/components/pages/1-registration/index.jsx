import React, { useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Checkbox,
  Button,
  AutoComplete,
  message,
  notification,

} from 'antd';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { residences } from "./residence.js";
import axios from 'axios';

import "./style/style.css"
import { RegisterItem } from "../../styles/styles"
import { StyledForm } from '../../styles/styles'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const openNotificationWithIcon = type => {
  if (type === "success") {
    notification[type]({
      message: 'BookBook diz:',
      description:
        'Usuário criado com sucesso!',
    });
  }
  else {
    notification[type]({
      message: 'BookBook diz:',
      description:
        'Falha ao criar o usuário! Tente novamente.',
    });
  }
};

const Registration = ({ setVisible }) => {
  const [form] = Form.useForm();
  // agreement: true
  // prefix: "55"
  // residence: (3) ["estado", "alagoas", "103"]

  const onFinish = values => {
    console.log('Received values of form: ', values);
    axios.post("https://ka-users-api.herokuapp.com/users", {
      "user": {
        "name": values.name,
        "user": values.nickname,
        "email": values.email,
        "image_url": values.image,
        "password": values.password,
        "password_confirmation": values.confirm,
        "address": values.residence[2],
      }
    })
      .then(() => {
        openNotificationWithIcon('success')
        setVisible(false);
      })
      .catch(error => {
        openNotificationWithIcon('error')
      })
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }))

  return (
    <StyledForm
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: [],
        prefix: '55',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Nome"
        rules={[
          {
            required: true,
            message: 'Insira seu nome',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="image"
        label={
          <span>
            Sua Foto&nbsp;
            <Tooltip title="Voce deve apenas por um link de uma imagem 
            da internet, como a foto do seu perfil do Facebook por exemplo.">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
      >
        <Input placeholder="https://imagefromweb" />
      </Form.Item>

      <Form.Item
        name="nickname"
        label={
          <span>
            Usuário&nbsp;
            <Tooltip title="Como você quer que os outros te chamem?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Digite seu usuário!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'Insira um email válido!',
          },
          {
            required: true,
            message: 'Digite seu email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Senha"
        rules={[
          {
            required: true,
            message: 'Digite sua senha!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirmar Senha"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Digite a confirmação da sua senha!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('As senhas não coincidem!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="residence"
        label="Cidade"
        rules={[
          {
            type: 'array',
            required: true,
          },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            required: true,
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('Tem que aceitar os termos do uso'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          Eu aceito os termos de <a href="terms.html" target="_BLANK">responsabilidade</a>
        </Checkbox>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </StyledForm>
  );
};


export default Registration;
