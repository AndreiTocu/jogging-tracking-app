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
        // TODO: Make fields empty.
        props.updateList();
        setIsModalVisible(false);
      } else {
        setError(response.data.error);
      }
    });
  };

  const handleCancel = () => {
    // TODO: change the values to null
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal title="Update User" visible={isModalVisible}
             onCancel={handleCancel}
             footer={null}>
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
