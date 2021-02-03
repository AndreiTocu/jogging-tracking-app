import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Alert, Layout, Form, Input, Button, Card } from 'antd';
import axios from 'axios';

function Update(props) {
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    delete values.confirm;
    setError('');
    axios.patch('/api/users/' + props.userData.id, {
      user: {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConfirmation
      }
    }).then(response => {
      if (response.data.success === 1) {
        props.updateList();
        setIsModalVisible(false);
      } else {
        setError(response.data.error);
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal title="Update User" visible={isModalVisible}
             onCancel={handleCancel} footer={null} destroyOnClose={true}>
        <Layout>
          <Card>
            {error &&
              <Alert description={error[0]} type="error" showIcon closable />}
            <Form
              name="basic"
              onFinish={onFinish}
            >
              <Form.Item
                label="Name"
                initialValue={props.userData.name}
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
                initialValue={props.userData.email}
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
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Password Confirmation"
                name="password_confirmation"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        'The two passwords that you entered do not match!'
                      );
                    },
                  })
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Layout>
      </Modal>
    </>
  );
};

export default Update
