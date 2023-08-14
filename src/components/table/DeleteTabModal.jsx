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

const DeleteTabModal = ({ modal, onDeleteTabClose, handleDeleteTab, deleteID, deleteName }) => {
  console.log({deleteName})

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeletion = useCallback(async () => {
    if (user) {
      handleDeleteTab(deleteID)
      onDeleteTabClose();
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
        onClose={(e) => onDeleteTabClose(e)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete {deleteName}?
              You can't retreive it if you delete it.
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletion}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={(e) => onDeleteTabClose(e)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteTabModal;
