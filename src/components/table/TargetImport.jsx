import {
  Alert,
  Button,
  FileInput,
  Label,
  Modal,
  Radio,
  Select,
  Tabs,
  Tooltip,
} from "flowbite-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../AuthContext";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import {
  getIndividualAnalogies,
  importAnalogy,
  updateTableTitle,
} from "../../firebase_setup/table";
import { useNavigate, useParams } from "react-router-dom";

const TargetImport = ({ modal, closeModal, user, updateTarget }) => {
  const [userAnalogs, setUserAnalogs] = useState();
  const [selectedAnalogy, setSelectedAnalogy] = useState("");

  const handleFileChange = (event) => {};

  const handleImport = (e) => {
    if (selectedAnalogy != "") {
      let data = userAnalogs.find((obj) => obj.id === selectedAnalogy).data
        .data;
      let newColumn = data.map((obj) => obj.header1);
      updateTarget(newColumn);
      console.log(newColumn);
      closeModal();
    }
  };

  let params = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (user && modal === true) {
        setUserAnalogs(await getIndividualAnalogies(user.uid, params.analogId));
      }
    }

    fetchData();
  }, [params, user, modal]);

  return (
    <>
      <React.Fragment>
        <Modal
          show={modal}
          size="md"
          popup={true}
          onClose={(e) => closeModal(e)}
        >
          <Modal.Header>Import Target</Modal.Header>
          <Modal.Body>
            <Alert color="failure" icon={InformationCircleIcon}>
              <span>
                <p>
                  <span className="font-medium">Info alert! </span>
                  Importing a Target from another analogy will override your
                  current Target!
                </p>
              </span>
            </Alert>
            <div className="max-w-md" id="select">
              <div className="mb-2 block">
                <Label
                  htmlFor="countries"
                  value="Select the Analogy to copy the target from"
                />
              </div>
              <Select
                id="Analogy"
                required
                value={selectedAnalogy}
                onChange={(e) => setSelectedAnalogy(e.target.value)}
              >
                <option value="">Select an analogy...</option>
                {userAnalogs
                  ? userAnalogs.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.data.title}
                      </option>
                    ))
                  : null}
              </Select>
            </div>
            <div className="w-full flex justify-center pt-2">
              <Button onClick={(e) => handleImport(e)}>Import Target</Button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );
};

export default TargetImport;
