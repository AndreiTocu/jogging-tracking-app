import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button} from 'antd';
import axios from 'axios';

function Delete(props) {
  const [error, setError] = useState([]);

  function handleSubmit() {
    axios.delete('/api/trainings/' + props.trainingData.id_training)
      .then(response => {
        if (response.data.success === 1) {
          // TODO: Make fields empty.
          props.updateList();
        }
    });
  }

  return (
    <>
      <Button type="danger" onClick={handleSubmit}>
        Delete
      </Button>
    </>
  );
};

export default Delete
