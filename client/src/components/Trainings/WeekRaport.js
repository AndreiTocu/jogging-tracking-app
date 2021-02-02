import React, { useState } from 'react'
import "antd/dist/antd.css";
import { DatePicker, Modal, Button, Statistic, Row, Col } from "antd";
import axios from 'axios';

function Raport(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [distanceStatistic, setDistanceStatistic] = useState();
  const [averageSpeedStatistic, setAverageSpeedStatistic] = useState();

  async function handleChange(date, dateString) {
    axios.post('/api/report', {
      id: props.userData.id,
      date: date
    }).then(data => {
      if (data.data.success === 1) {
        setDistanceStatistic(data.data.report.distance);
        setAverageSpeedStatistic(data.data.report.average_speed);
      }
    })
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Weekly Raports
      </Button>
      <Modal title="Week Report" visible={isModalVisible}
             onCancel={handleCancel}
             width={600}
             footer={null}>
        <Row gutter={12}>
          <Col span={8}>
            <div>Week of the year</div>
            <DatePicker picker="week" bordered={false} onChange={handleChange} />
          </Col>
          <Col span={8}>
            <Statistic title="Distance" value={distanceStatistic}
                       precision={2}/>
          </Col>
          <Col span={8}>
            <Statistic title="Average Speed" value={averageSpeedStatistic}
                       precision={2} />
          </Col>
         </Row>
       </Modal>
    </>
  );
}

export default Raport
