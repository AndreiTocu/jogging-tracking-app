import React from 'react'
import 'antd/dist/antd.css';
import { Layout, Card } from 'antd';

const pageStyle = {alignItems: 'center'};

const Home = () => {
  return (
    <Layout style={pageStyle}>
      <Card style={{ width: 300 }}>
        <p>Jogging Application</p>
      </Card>
    </Layout>
  )
}

export default Home
