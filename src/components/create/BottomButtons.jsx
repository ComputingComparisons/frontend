import { Button, Tabs, Toast, Tooltip } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams, redirect } from "react-router-dom";
import {
  createIndividualAnalogy,
  deleteIndividualById,
  getIndividualAnalogies,
} from "../../firebase_setup/table";
import DeleteTabModal from "../table/DeleteTabModal.jsx";

const BottomButtons = ({ user }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [userAnalogs, setUserAnalogs] = useState([]);
  const [alert, setAlert] = useState(false);
  const tabsRef = useRef(null);
  const [tabModal, setTabModal] = useState(false);
  const [deleteID, setDeleteID] = useState();
  let params = useParams();
  let navigate = useNavigate();

  const onDeleteTabClose = (e) => {
    setTabModal(false);
  };

  const onDeleteTabOpen = (e) => {
    setTabModal(true);
  };

  useEffect(() => {
    async function fetchData() {
      setUserAnalogs(await getIndividualAnalogies(user.uid, params.analogId));
    }
    fetchData();
  }, [params]);

  const handleNewTab = async () => {
    const newAnalog = await createIndividualAnalogy(
      user.uid,
      params.analogId,
      "Analogy" + (userAnalogs.length + 1)
    );
    if (newAnalog) {
      setUserAnalogs(userAnalogs.concat(newAnalog));
      window.location.href = `/create/${newAnalog[0].path}`;
    }
  };

  const handleDeleteTab = async (id) => {
    if (userAnalogs.length > 1) {
      if (await deleteIndividualById(user.uid, params.analogId, id)) {
        setUserAnalogs(await getIndividualAnalogies(user.uid, params.analogId));
      }
      if (params.indId === id) {
        navigate(`/create/${params.analogId}`);
      }
    } else {
      alert("Connot Delete All Tabs");
    }
  };

  return (
    <>
      <div className="flex flex-row h-auto bg-slate-100 justify-center pb-2 pt-2  border-t border-slate-400">
        <div className="flex flex-row">
          {userAnalogs.map((i) => (
            <Button
              key={`tab-${i.id}`}
              className={`mx-1`}
              href={`/create/${i.path}`}
              color={params.indId === i.id ? "blue" : "info"}
            >
              {i.data.title}
              <XMarkIcon
                className="ml-2 h-5 w-5 hover:bg-blue-500 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setDeleteID(i.id);
                  onDeleteTabOpen();
                }}
              />
            </Button>
          ))}
          <div className="flex justify-center h-full">
            <div className="self-center">
              <Tooltip content="New Tab">
                <PlusIcon
                  color="#00000"
                  className="h-6 hover:bg-slate-200 rounded-full "
                  onClick={(e) => handleNewTab()}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <DeleteTabModal
        modal={tabModal}
        onDeleteTabClose={onDeleteTabClose}
        handleDeleteTab={handleDeleteTab}
        deleteID={deleteID}
      />
    </>
  );
};

export default BottomButtons;
