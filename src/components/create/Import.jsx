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

const Import = ({ tableId, user }) => {
  const [uploadModal, setUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

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
        await importAnalogy(user.uid, tableId, jsonData);
        setUploadModal(false);
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <>
      <Button
        className=" mr-2"
        disabled={false}
        onClick={(e) => setUploadModal(true)}
      >
        <ArrowDownOnSquareIcon className="lg:mr-2 h-5 w-5" />
        <p className="hidden lg:inline">Import</p>
      </Button>
      <React.Fragment>
        <Modal
          show={uploadModal}
          size="md"
          popup={true}
          onClose={(e) => setUploadModal(false)}
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

export default Import;
