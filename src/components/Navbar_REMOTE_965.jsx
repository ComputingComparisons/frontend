import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  Button,
  Label,
  Checkbox,
  TextInput,
  Modal,
} from "flowbite-react";
import { HomeIcon, PlusIcon, UserIcon } from "@heroicons/react/24/solid";
import image from "../assets/logo.png";
import NewAnalogModal from "./NewAnalogModal";
import NewProfileModal from "./NewProfileModal";

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [collapse, setCollapse] = useState(false);
  const [modal, setModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const onProfileClick = (e) => {
    setProfileModal(true);
  };

  const onProfileClose = (e) => {
    setProfileModal(false);
  };

  const onCreateClick = (e) => {
    setModal(true);
  };

  const onCreateClose = (e) => {
    setModal(false);
  };
  return (
    <div className="w-fit border-r border-slate-400 h-screen flex flex-col">
      <Sidebar collapsed={false} className="flex-grow">
        {/*<img src={image} alt="" className="h-auto w-auto mb-8" />*/}
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HomeIcon}>
              Home
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={UserIcon}
              onClick={(e) => onProfileClick(e)}>
              Profile
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={PlusIcon}
              onClick={(e) => onCreateClick(e)}
              className="fill-white border-2 border-blue-600  hover:border-blue-700"
            >
              New Analogy
            </Sidebar.Item>
            <NewAnalogModal modal={modal} onCreateClose={onCreateClose} />
            <NewProfileModal profileModal={profileModal} onProfileClose={onProfileClose} />
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="h-auto w-auto max-w-xs pb-4 flex justify-center">
        <img src={image} alt="" className="w-40" />
      </div>
    </div>
  );
};

export default Navbar;
