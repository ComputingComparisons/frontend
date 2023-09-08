import React, {
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import AuthContext from "../../AuthContext";
import {
  Sidebar,
  Button,
  Label,
  Checkbox,
  Modal,
  Alert,
  Select,
} from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createClassroom,
  createTemplateAnalogy,
} from "../../firebase_setup/classroom";
import { getAllAnalogies } from "../../firebase_setup/home";
import {
  getIndividualAnalogies,
  getTableById,
} from "../../firebase_setup/table";

const NewTemplateModal = ({ modal, onCreateClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [adminAnalogs, setAdminAnalogs] = useState([]);
  const selectRef = useRef(); // Reference for the Select input
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { user: contextUser } = useContext(AuthContext);
  const params = useParams();

  useEffect(() => {
    if (contextUser) {
      setUser(contextUser);
    }
  }, [contextUser]);

  useEffect(() => {
    async function fetchData() {
      const analogs = await getAllAnalogies(user.uid);
      setAdminAnalogs(analogs);
    }
    if (user) {
      fetchData();
    }
  }, [user, params]);

  const handleAddDataClick = useCallback(async () => {
    const selectedValue = selectRef.current.value;
    if (!selectedValue) {
      setErrorMessage("A selection is required.");
      return;
    }

    if (user) {
      const data = await getTableById(user.uid, selectedValue);
      //const parsedData = JSON.parse(data);
      const allAnalogies = await getIndividualAnalogies(
        user.uid,
        selectedValue
      );
      data.individualCollection = allAnalogies;
      const jsonData = JSON.stringify(data);
      console.log(jsonData);
      createTemplateAnalogy(params.classroomId, jsonData);
      setErrorMessage(""); // Clear any previous error messages
      onCreateClose();
    } else {
      console.error("User not signed in.");
    }
  }, [user, selectRef, onCreateClose]);

  return (
    <React.Fragment>
      <Modal show={modal} size="md" popup={true} onClose={onCreateClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add Template
            </h3>
            {errorMessage && (
              <Alert color="failure">
                <span>{errorMessage}</span>
              </Alert>
            )}
            <div className="max-w-md" id="select">
              <div className="mb-2 block">
                <Label htmlFor="analogs" value="Select an Analogy" />
              </div>
              <Select id="analogs" required ref={selectRef}>
                {adminAnalogs.map((analog) => (
                  <option key={analog.id} value={analog.id}>
                    {analog.data.title}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-full flex justify-center">
              <Button onClick={handleAddDataClick}>Create</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default NewTemplateModal;
