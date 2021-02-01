import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import { Layout, Form, Input, Button, Card, Alert } from 'antd';
import axios from 'axios'

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

function SignIn(props) {
  const history = useHistory();
  const [error, setError] = useState('');

  const onFinish = (values) => {
    delete values.confirm;
    setError('');
    axios.post('/api/signin', {
      session: {
        email: values.email,
        password: values.password
      }
    }).then(data => {
      if (data.data.success === 1) {
        props.onSigninSuccess();
        history.push({pathname: '/'});
      } else {
        setError(data.data.error);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const pageStyle = { alignItems: 'center' };

  return (
    <Layout style={pageStyle}>
      <Card>
        {error &&
          <Alert description={error} type="error" showIcon closable />}
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
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

export default SignIn
