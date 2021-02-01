import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, TimePicker, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axios from 'axios';

function Add(props) {
  const [error, setError] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (time && date && distance) {
      axios.post('/api/trainings', {
        training: {
          distance: distance,
          time: time,
          date: date
        }
      }).then(resp => {
        if (resp.data.success === 1) {
          // TODO: Make fields empty.
          props.updateList();
          setIsModalVisible(false);
        } else {
          setError(resp.data.error);
        }
      });
    } else {
      alert("You have to fill all the inputs!");
    }
  };

  const handleCancel = () => {
    // TODO: change the values to null
    setIsModalVisible(false);
  };

  function onChangeTime(time, timeString) {
    setTime(timeString);
  }

  function onChangeDate(date, dateString) {
    setDate(dateString);
  }

  function onChangeDistance(value) {
    setDistance(value);
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create new Record
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk}
             onCancel={handleCancel}>
        <InputNumber min={0} max={10000}
                     onChange={onChangeDistance} />
        <TimePicker onChange={onChangeTime}
                    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
        <DatePicker onChange={onChangeDate} />
      </Modal>
    </>
  );
};

export default Add
