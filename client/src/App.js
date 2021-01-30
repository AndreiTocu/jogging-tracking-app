import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Layout, Divider } from 'antd';
import './App.css';
import Home from './components/Home'
import Navbar from './components/UI/Navbar'
const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Divider/>
      <Navbar/>
      <Content>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
        </BrowserRouter>
      </Content>
      <Divider/>
    </Layout>
  );
}

export default App;
