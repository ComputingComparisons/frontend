import React, { useContext, useState, useCallback, useRef } from "react";
import AuthContext from "../AuthContext";
import Column from "./Column";
import EditableTable from "./table/EditableTable";
import { addDataToFirestore } from "../firebase_setup/table";
import {
  Sidebar,
  Button,
  Label,
  Checkbox,
  TextInput,
  Modal,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

const NewAnalogModal = ({ modal, onCreateClose }) => {
  const { user } = useContext(AuthContext);
  const [newID, setnewID] = useState();
  const analogRef = useRef();
  const navigate = useNavigate();

  const handleAddDataClick = useCallback(async () => {
    if (user) {
      navigate(
        `/create/${await addDataToFirestore(user.uid, analogRef.current.value)}`
      );
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
              Create New Analogy
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="document Name" value="Analogy Name" />
              </div>
              <TextInput
                id="documentName"
                placeholder="Analogy Name"
                required={true}
                ref={analogRef}
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

export default NewAnalogModal;
