import React from "react";
import {  Form, Input, Button, Checkbox  } from "antd";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
    
const Demo = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            >
                <Input placeholder="Username" />
            </Form.Item>
    
            <Form.Item
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
                <Input.Password placeholder="Password"/>
            </Form.Item>
    
            <Form.Item {...tailLayout}>
                <Button type="primary" block>
                    login
                </Button>
            </Form.Item>
        </Form>
    );
};


export default Demo;

