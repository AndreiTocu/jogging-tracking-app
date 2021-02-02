import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import axios from 'axios';

function Delete(props) {
  const [error, setError] = useState([]);

  function handleSubmit() {
    axios.delete('/api/users/' + props.userData.id)
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
