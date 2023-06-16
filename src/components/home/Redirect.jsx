import { Button, Spinner, Tabs, Tooltip } from "flowbite-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import { getIndividualAnalogies } from "../../firebase_setup/table";
import AuthContext from "../../AuthContext";
const Redirect = () => {
  const [userAnalogs, setUserAnalogs] = useState();
  const [user, setUser] = useState(null);

  const { user: contextUser } = useContext(AuthContext);

  useEffect(() => {
    if (contextUser) {
      setUser(contextUser);
    }
  }, [contextUser]);

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (user) {
        setUserAnalogs(await getIndividualAnalogies(user.uid, params.analogId));
      }
    }

    fetchData();
    if (user && userAnalogs) {
      console.log(userAnalogs);
      navigate(`/create/${userAnalogs[0].id}`);
    }
  }, [params, user, userAnalogs]);

  return (
    <>
      <div className="flex w-screen h-screen justify-center">
        <div className="self-center">
          <Spinner aria-label="Default status example" size="xl" />
        </div>
      </div>
    </>
  );
};

export default Redirect;
