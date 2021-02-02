import React, { useEffect, useState, useCallback } from 'react'
import 'antd/dist/antd.css';
import { Table, Layout, Space, Card } from 'antd';
import axios from 'axios'
import Delete from './Delete'
import Update from './Update'
import Add from './Add'
import Trainings from './Trainings'

const { Column } = Table;
const pageStyle = {alignItems: 'center'};

function Users() {
  const [shouldRender, setShouldRender] = useState(false);
  const [usersData, setUsersData] = useState({});

  const getUsersData = useCallback(async () => {
    const usersDataResponse = await axios.get('/api/users').then(data => data);
    if (usersDataResponse.data.success === 1) {
      const usersData = usersDataResponse.data.users;
      setUsersData(usersData);
    }
  }, []);

  useEffect(() => {
    getUsersData().then(() => {
      setShouldRender(true);
    });
  }, [shouldRender, getUsersData]);

  function isAdmin() {
    return window.sessionStorage.userRole === 'ADMIN'
  }

  return (
    <>
      <Layout style={pageStyle}>
        {shouldRender
          ? <Card>
              <Add updateList={getUsersData} />
              <Table dataSource={usersData}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="E-mail" dataIndex="email" key="email" />
                <Column title="Action"
                  key="action"
                  render={(text, record) => (
                    <Space size="middle">
                      <Update userData={record} updateList={getUsersData}/>
                      <Delete userData={record} updateList={getUsersData}/>
                      {isAdmin()
                        ? <Trainings userData={record} />
                        : null
                        }
                    </Space>
                  )}
                />
              </Table>
            </Card>
          : null
        }
      </Layout>
    </>
  );
}

export default Users
