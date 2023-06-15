import { Button, Tabs, Tooltip } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import { getIndividualAnalogies } from "../../firebase_setup/table";
const BottomButtons = ({ data, user }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [userAnalogs, setUserAnalogs] = useState([]);
  const tabsRef = useRef(null);

  let params = useParams();

  const dat = [{ name: "Analog1" }, { name: "Analog2" }, { name: "Analog2" }];

  useEffect(() => {
    async function fetchData() {
      setUserAnalogs(await getIndividualAnalogies(user.uid, params.analogId));
    }

    fetchData();
  }, [params]);

  return (
    <>
      <div className="flex flex-row h-auto bg-slate-100 justify-center pb-2 pt-2  border-t border-slate-400">
        <div className="flex flex-row">
          {userAnalogs.map((i) => (
            <Button className="mx-1" href={`/create/${i.id}`}>
              {i.id}
              <XMarkIcon className="ml-2 h-5 w-5 hover:bg-blue-500 rounded-full" />
            </Button>
          ))}
          <div className="flex justify-center h-full">
            <div className="self-center">
              <Tooltip content="New Tab">
                <PlusIcon
                  color="#00000"
                  className="h-6 hover:bg-slate-200 rounded-full "
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
