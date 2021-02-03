import React, { useState } from 'react'
import Feed from '../Trainings/Feed'
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

function Trainings(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Trainings
      </Button>
      <Modal title="Trainings" visible={isModalVisible}
             onCancel={handleCancel}
             footer={null}
             width={800}>
        <Feed userData={props.userData} />
      </Modal>
    </>
  );
}

export default Trainings
