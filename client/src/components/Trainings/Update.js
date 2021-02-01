import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, TimePicker, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axios from 'axios';

function Update(props) {
  const [error, setError] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = () => {
    if (time && date && distance ) {
      axios.patch('/api/trainings/' + props.trainingData.id_training, {
        training: {
          distance: distance,
          time: time,
          date: date
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

  useEffect(() => {
    setTime(props.trainingData.time);
    setDate(props.trainingData.date);
    setDistance(props.trainingData.distance);
  }, []);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleSubmit}
             onCancel={handleCancel}>
        <InputNumber min={0} max={10000} onChange={onChangeDistance}
                     defaultValue={props.trainingData.distance}/>
        <TimePicker onChange={onChangeTime}
                    defaultValue={moment(props.trainingData.time, 'HH:mm:ss')}/>
        <DatePicker onChange={onChangeDate}
                    placeholder={props.trainingData.date}/>
      </Modal>
    </>
  );
};

export default Update
