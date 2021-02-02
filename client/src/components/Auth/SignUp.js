import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import { Alert, Layout, Form, Input, Button, Card } from 'antd';
import axios from 'axios'

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SignUp = () => {

  const [error, setError] = useState('');
  const history = useHistory();
  const onSuccessLocation = {
    pathname: '/signin',
  }

  const onFinish = (values) => {
    delete values.confirm;
    setError('');
    axios.post('/api/users', {
      user: {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation
      }
    }).then(data => {
      if (data.data.success === 1){
        history.push(onSuccessLocation);
      } else {
        setError(data.data.error);
      }
    });
  };

  const pageStyle = { alignItems: 'center' };

  return (
    <Layout style={pageStyle}>
      <Card>
        {error &&
          <Alert description={error[0]} type="error" showIcon closable />}
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Password Confirmation"
            name="password_confirmation"
            rules={[
              {
                required: true,
                message: 'Please input your password confirmation!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default SignUp
