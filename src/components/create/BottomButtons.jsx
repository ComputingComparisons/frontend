import { Button, Tabs, Toast, Tooltip } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import {
  createIndividualAnalogy,
  deleteIndividualById,
  getIndividualAnalogies,
} from "../../firebase_setup/table";
const BottomButtons = ({ data, user }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [userAnalogs, setUserAnalogs] = useState([]);
  const [alert, setAlert] = useState(false);
  const tabsRef = useRef(null);

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setUserAnalogs(await getIndividualAnalogies(user.uid, params.analogId));
    }
    fetchData();
  }, [params]);

  const handleNewTab = async () => {
    const newAnalog = await createIndividualAnalogy(user.uid, params.analogId);
    if (newAnalog) {
      setUserAnalogs(userAnalogs.concat(newAnalog));
    }
  };

  const handleDeleteTab = async (e, id) => {
    e.preventDefault();
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
                onClick={(e) => handleDeleteTab(e, i.id)}
              />
            </Button>
          ))}
          <div className="flex justify-center h-full">
            <div className="self-center">
              <Tooltip content="New Tab">
                <PlusIcon
                  color="#00000"
                  className="h-6 hover:bg-slate-200 rounded-full "
                  onClick={handleNewTab}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomButtons;
