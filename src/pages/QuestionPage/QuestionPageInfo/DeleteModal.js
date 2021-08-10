import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ setIsSure, show, handleDeletebtn }) => {
  const [accept,setAccept] = useState(true);
  const handleClose = () => setIsSure(false);
  const deleteBtn = () => {
    if (accept) {
      handleDeletebtn();
      setAccept(false)
    }
  };
  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Are you sure delete your post?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={deleteBtn}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
