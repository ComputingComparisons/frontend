import { getAllAnalogies } from "../../firebase_setup/home";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../AuthContext";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Dropdown, Spinner } from "flowbite-react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import DeleteAnalogModal from "./DeleteAnalogModal.jsx";
import { DropdownDivider } from "flowbite-react/lib/esm/components/Dropdown/DropdownDivider";
import amber_image from "../../assets/amber_background.png";
import blue_image from "../../assets/blue_background.png";
import cyan_image from "../../assets/cyan_background.png";
import green_image from "../../assets/green_background.png";
import pink_image from "../../assets/pink_background.png";
import red_image from "../../assets/red_background.png";

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

    console.log(user);
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

  const getBGImage = (card) => {
    const color = card.data.color;
    if (color === "red") {
      return red_image;
    } else if (color === "green") {
      return green_image;
    } else if (color === "orange") {
      return amber_image;
    } else if (color === "blue") {
      return blue_image;
    } else if (color === "pink") {
      return pink_image;
    } else {
      return cyan_image;
    }
  };

  return (
    <div className="flex flex-row w-screen">
      <Navbar />
      <div className="overflow-y-auto h-screen w-full">
        {userAnalogs ? (
          <div className="grid grid-cols-2 gap-4 lg:gap-8 p-4 lg:grid-cols-3 xl:grid-cols-4 lg:p-16 ">
            {userAnalogs.map((i) => (
              <div className="max-w-sm">
                <Card
                  imgSrc={getBGImage(i)}
                  imgAlt="Single colored image"
                  href={`/create/${i.id}`}
                >
                  <div className="flex flex-row w-full justify-between items-center">
                    <h5 className="tracking-tight text-gray-900 dark:text-white">
                      {i.data.title}
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
