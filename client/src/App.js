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
import Feed from './components/Trainings/Feed'
import RoleRoute from './components/Permissions/RoleRoute'
import Users from './components/User/Users'

const { Content } = Layout;
const pageContainer = {
    position: 'relative',
    minHeight: '100vh'
};

function App() {
  const [userData, setUserData] = useState({});
  const [shouldRender, setShouldRender] = useState(false);

  function onSetUserSession(id, role) {
    setUserData({ id: id, role: role });
  }

  const setUserSession = useCallback(async () => {
    const sessionDataResponse = await axios.get('/api/session')
      .then(data => data);
    if (sessionDataResponse.data.success === 1) {
      const userSession = sessionDataResponse.data.session;
      userSession.id ?
        window.sessionStorage.setItem('userId', userSession.id) :
          window.sessionStorage.removeItem('userId');
      userSession.role ?
        window.sessionStorage.setItem('userRole', userSession.role) :
          window.sessionStorage.removeItem('userRole');
      onSetUserSession(userSession.id, userSession.role);
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
              <Route exact path="/feed" component={Feed}>
                <Feed userData={getUserData()}/>
              </Route>
              <RoleRoute userData={userData} path='/user-feed'>
                <Users/>
              </RoleRoute>
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
