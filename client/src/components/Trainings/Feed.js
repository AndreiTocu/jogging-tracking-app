import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import "antd/dist/antd.css";
import { Table, Space, Layout, Button, Card } from "antd";
import Add from './Add'
import Update from './Update'
import Delete from './Delete'

const { Column, ColumnGroup } = Table;
const pageStyle = {alignItems: 'center'};
const contentStyle = {textAlign: 'center'};

function Feed(props) {
  const [trainingsFeed, setTrainingsFeed] = useState([]);
  const [shouldRender, setShouldRender] = useState(false);
  const [error, setError] = useState('');

  const getFeed = useCallback(async () => {
    const feed = await axios.get('/api/feed/' + props.userData.id)
      .then(data => data);
    if (feed.data.success === 1) {
      setTrainingsFeed(feed.data.trainings);
    } else {
      setError(feed.data.errors);
    }
  }, []);

  useEffect(() => {
    getFeed().then(() => {
      setShouldRender(true);
    });
  }, [shouldRender, setTrainingsFeed]);

  return (
    <>
    {shouldRender
      ? <Layout style={pageStyle}>
          <Card>
            <Add userData={props.userData} updateList={getFeed}/>
          </Card>
          <Table dataSource={trainingsFeed}>
            <Column title="Distance" dataIndex="distance" key="distance" />
            <Column title="Average Speed" dataIndex="average_speed" key="avg_spd" />
            <Column title="Time" dataIndex="time" key="Time" />
            <Column title="Date" dataIndex="date" key="date" />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <Update trainingData={record} updateList={getFeed}/>
                  <Delete trainingData={record} updateList={getFeed}/>
                </Space>
              )}
            />
          </Table>
        </Layout>
      : null
    }
    </>
  )
}

export default Feed
