import React, { useContext, useState, useCallback, useRef } from "react";
import AuthContext from "../AuthContext";
import { signOutApp } from "../firebase_setup/firebase";
import {
  Sidebar,
  Button,
  Label,
  Checkbox,
  TextInput,
  Modal,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

const NewProfileModal = ({ profileModal, onProfileClose }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOutApp();
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <React.Fragment>
      <Modal
        show={profileModal}
        size="md"
        popup={true}
        onClose={(e) => onProfileClose(e)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Computing Comparisons Profile
            </h3>
            <div className="flow-root">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Email</dt>
                  <dd className="text-gray-700 sm:col-span-2">{user.email}</dd>
                </div>
              </dl>
            </div>
            <div className=" flex justify-center">
              <Button className="border border-black" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default NewProfileModal;
