import React, { useCallback, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout, Divider } from 'antd';
import axios from 'axios';
import './App.css';
import Home from './components/Home'
import Navbar from './components/UI/Navbar'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import SignOut from './components/Auth/SignOut'

const { Content } = Layout;
const pageContainer = {
    position: 'relative',
    minHeight: '100vh'
};

function App() {
  const [userData, setUserData] = useState({});
  const [shouldRender, setShouldRender] = useState(false);

  function onSetUserSession(id) {
    setUserData({ id: id });
  }

  const setUserSession = useCallback(async () => {
    const sessionDataResponse = await axios.get('/api/session')
      .then(data => data);
    console.log(sessionDataResponse);
    if (sessionDataResponse.data.success === 1) {
      const userSession = sessionDataResponse.data.session;
      userSession.id ?
        window.sessionStorage.setItem('userId', userSession.id) :
          window.sessionStorage.removeItem('userId');
      onSetUserSession(userSession.id);
    }
  }, []);

  function getUserData() {
    return {
      id: window.sessionStorage.getItem('userId')
    };
  }

  useEffect(() => {
    setUserSession().then(() => {
      setShouldRender(true);
    });
  }, [shouldRender, setUserSession]);

  return (
    <>
    {shouldRender
      ? <Layout style={pageContainer}>
          <Divider/>
          <Navbar userData={userData}/>
          <Content>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/signup" component={SignUp}>
                <SignUp/>
              </Route>
              <Route path="/signin" component={SignIn}>
                <SignIn onSigninSuccess={setUserSession}/>
              </Route>
              <Route exact path="/signout" component={SignOut}>
                <SignOut onSignoutSuccess={setUserSession}/>
              </Route>
            </Switch>
          </Content>
          <Divider/>
        </Layout>
      : null
    }
    </>
  );
}

export default App;
