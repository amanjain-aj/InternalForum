import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AnswerDeleteModal = ({
  setIsConfirm,
  show,
  handleAnswerDelete,
  answerId,
}) => {
  const [agree,setAgree] = useState(true);
  const handleClose = () => setIsConfirm(false);
  const deleteAnswer = () => {
    if (agree) {
      handleAnswerDelete(answerId);
      setAgree(false);
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
          <Button variant="primary" onClick={deleteAnswer}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AnswerDeleteModal;
