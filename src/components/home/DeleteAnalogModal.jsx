import React, { useContext, useState, useCallback, useRef } from "react";
import AuthContext from "../../AuthContext";
import { addDataToFirestore } from "../../firebase_setup/table";
import {
  Sidebar,
  Button,
  Label,
  Checkbox,
  TextInput,
  Modal,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { deleteTableById } from "../../firebase_setup/home";

const DeleteAnalogModal = ({ modal, onDeleteClose, deleteId }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeleteAnalog = useCallback(async () => {
    if (user) {
      await deleteTableById(user.uid, deleteId);
      navigate("/");
      onDeleteClose();
    } else {
      console.error("User not signed in.");
    }
  });

  return (
    <React.Fragment>
      <Modal
        show={modal}
        size="md"
        popup={true}
        onClose={(e) => onDeleteClose(e)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Analogy?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteAnalog}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={(e) => onDeleteClose(e)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteAnalogModal;
