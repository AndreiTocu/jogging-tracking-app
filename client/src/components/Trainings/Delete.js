import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button} from 'antd';
import axios from 'axios';

function Delete(props) {

  function handleSubmit() {
    axios.delete('/api/trainings/' + props.trainingData.id_training + "?userId="
      + props.userId)
      .then(response => {
        if (response.data.success === 1) {
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
