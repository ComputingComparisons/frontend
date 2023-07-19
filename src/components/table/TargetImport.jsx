import { Button, FileInput, Label, Modal, Tabs, Tooltip } from "flowbite-react";
import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../AuthContext";
import {
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { importAnalogy, updateTableTitle } from "../../firebase_setup/table";
import { useNavigate } from "react-router-dom";

const TargetImport = ({ modal, closeModal }) => {
  const [selectedFile, setSelectedFile] = useState();
  const { user } = useContext(AuthContext);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        // 'e.target.result' contains the text of the file
        const fileContent = e.target.result;
        const jsonData = JSON.parse(fileContent);
        await importAnalogy(user.uid, jsonData);
        closeModal();
        window.location.reload();
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <>
      <React.Fragment>
        <Modal
          show={modal}
          size="md"
          popup={true}
          onClose={(e) => closeModal(e)}
        >
          <Modal.Header>Import Analogy</Modal.Header>
          <Modal.Body>
            <div className="max-w-md" id="fileUpload">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload file" />
              </div>
              <FileInput
                helperText="Upload JSON to populate the table."
                id="file"
                accept=".json"
                onChange={handleFileChange}
              />
            </div>

            <div className="w-full flex justify-center pt-2">
              <Button onClick={handleUpload}>Import</Button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );
};

export default TargetImport;
