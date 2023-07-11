import { getAllAnalogies } from "../../firebase_setup/home";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../AuthContext";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Dropdown, Spinner } from "flowbite-react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import DeleteAnalogModal from "./DeleteAnalogModal.jsx";
import { DropdownDivider } from "flowbite-react/lib/esm/components/Dropdown/DropdownDivider";
import image from "../../assets/table.jpg";

const Home = () => {
  let params = useParams();
  const [userAnalogs, setUserAnalogs] = useState();
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const navigate = useNavigate();
  const { user: contextUser } = useContext(AuthContext);

  useEffect(() => {
    if (contextUser) {
      setUser(contextUser);
    }
  }, [contextUser]);

  useEffect(() => {
    async function fetchData() {
      setUserAnalogs(await getAllAnalogies(user.uid));
    }
    if (user) {
      fetchData();
    }
  }, [user, params]);

  const onDeleteClose = (e) => {
    setModal(false);
  };

  const onDeleteOpen = (e) => {
    setModal(true);
  };

  return (
    <div className="flex flex-row w-screen">
      <Navbar />
      <div className="overflow-y-auto h-screen w-full">
        {userAnalogs ? (
          <div className="grid grid-cols-2 gap-4 lg:gap-8 p-4 lg:grid-cols-3 xl:grid-cols-4 lg:p-16">
            {userAnalogs.map((i) => (
              <div className="max-w-sm" key={i.id}>
                <Card
                  imgSrc={image}
                  imgAlt="Meaningful alt text for an image that is not purely decorative"
                  href={`/create/${i.id}`}
                >
                  <div className="flex flex-row w-full justify-between items-center">
                    <h5 className="tracking-tight text-gray-900 dark:text-white">
                      {i.data.title}
                      <p className=" text-xs text-gray-500">
                        {i.data.date_created
                          ? "Created: " +
                            i.data.date_created.toDate().toLocaleString()
                          : "\n"}
                      </p>
                    </h5>
                    <EllipsisVerticalIcon
                      className="h-5 hover:bg-white rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setDeleteId(i.id);
                        onDeleteOpen();
                      }}
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full w- justify-center overflow-clip">
            <div className="self-center">
              <Spinner aria-label="Default status example" size="xl" />
            </div>
          </div>
        )}
        <DeleteAnalogModal
          onDeleteClose={onDeleteClose}
          modal={modal}
          deleteId={deleteId}
        />
      </div>
    </div>
  );
};

export default Home;
