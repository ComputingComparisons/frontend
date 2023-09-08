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
  Alert,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { createClassroom } from "../../firebase_setup/classroom";

const NewClassroomAdminModal = ({ modal, onCreateClose }) => {
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const classroomRef = useRef();
  const passcodeRef = useRef();
  const navigate = useNavigate();

  const handleAddDataClick = useCallback(async () => {
    if (!classroomRef.current.value) {
      setErrorMessage("Classroom Name is required.");
      return;
    }

    if (!passcodeRef.current.value) {
      setErrorMessage("Passcode is required.");
      return;
    }

    if (user) {
      createClassroom(
        user.uid,
        classroomRef.current.value,
        passcodeRef.current.value
      );
      setErrorMessage(""); // Clear any previous error messages
      onCreateClose();
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
        onClose={(e) => onCreateClose(e)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create New Classroom
            </h3>
            {errorMessage && (
              <Alert color="failure">
                <span>{errorMessage}</span>
              </Alert>
            )}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="classroomName" value="Classroom Name" />
              </div>
              <TextInput
                id="classroomName"
                placeholder="Classroom Name"
                required={true}
                ref={classroomRef}
              />
              <div className="mb-2 block">
                <Label htmlFor="passcode" value="Passcode" />
              </div>
              <TextInput
                id="passcode"
                placeholder="Passcode"
                required={true}
                ref={passcodeRef}
              />
            </div>

            <div className="w-full flex justify-center">
              <Button onClick={(e) => handleAddDataClick()}>Create</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default NewClassroomAdminModal;
