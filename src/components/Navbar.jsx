import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  Button,
  Label,
  Checkbox,
  TextInput,
  Modal,
} from "flowbite-react";
import {
  HomeIcon,
  PlusIcon,
  UserIcon,
  ArrowDownOnSquareIcon,
  UserGroupIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";
import image from "../assets/logo.png";
import NewAnalogModal from "./NewAnalogModal";
import Export from "./create/Export";
import Import from "./home/Import";
import NewProfileModal from "./NewProfileModal";

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { pathname } = useLocation();
  const [collapse, setCollapse] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const onProfileClick = (e) => {
    setProfileModal(true);
  };

  const onProfileClose = (e) => {
    setProfileModal(false);
  };

  const onCreateClick = (e) => {
    setCreateModal(true);
  };

  const onCreateClose = (e) => {
    setCreateModal(false);
  };

  const onImportClick = (e) => {
    setImportModal(true);
  };

  const onImportClose = (e) => {
    setImportModal(false);
  };
  return (
    <div className="w-fit border-r border-slate-400 h-screen flex flex-col">
      <Sidebar collapsed={collapse} className="flex-grow">
        {/*<img src={image} alt="" className="h-auto w-auto mb-8" />*/}
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="/"
              icon={HomeIcon}
              className={pathname == "/" ? "bg-gray-100" : ""}
            >
              Home
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={UserIcon}
              onClick={(e) => onProfileClick(e)}
            >
              Profile
            </Sidebar.Item>
            <Sidebar.Item
              href="/classrooms"
              icon={UserGroupIcon}
              className={pathname == "/classrooms" ? "bg-gray-100" : ""}
            >
              Classrooms
            </Sidebar.Item>
            <Sidebar.Item
              icon={ArrowDownOnSquareIcon}
              onClick={(e) => onImportClick(e)}
              href="#"
            >
              Import Analogy
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={PlusIcon}
              onClick={(e) => onCreateClick(e)}
              className="fill-white border-2 border-blue-600  hover:border-blue-700"
            >
              New Analogy
            </Sidebar.Item>
            <NewAnalogModal modal={createModal} onCreateClose={onCreateClose} />
            <NewProfileModal
              profileModal={profileModal}
              onProfileClose={onProfileClose}
            />
            <Import modal={importModal} closeModal={onImportClose} />
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="h-auto w-auto max-w-xs pb-4 flex justify-center">
        <img src={image} alt="" className={`${collapse ? "w-10" : "w-40"}`} />
      </div>
    </div>
  );
};

export default Navbar;
