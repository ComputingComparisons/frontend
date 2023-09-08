import React, { useState, useEffect } from "react";
import { Button, Table } from "flowbite-react";
import Navbar from "../Navbar";
import { getClassroomsByAdmin } from "../../firebase_setup/classroom";
import AuthContext from "../../AuthContext";
import { useContext } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import NewClassroomAdminModal from "./NewClasroomAdminModal";

export default function AdminClassroomList() {
  const [classrooms, setClassrooms] = useState([]);
  const [user, setUser] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const { user: contextUser } = useContext(AuthContext);
  const onCreateClick = (e) => {
    setCreateModal(true);
  };

  const onCreateClose = (e) => {
    setCreateModal(false);
  };

  useEffect(() => {
    if (contextUser) {
      setUser(contextUser);
    }
  }, [contextUser]);

  useEffect(() => {
    async function fetchData() {
      const fetchedClassrooms = await getClassroomsByAdmin(user.uid);
      setClassrooms(fetchedClassrooms);
      console.log(fetchedClassrooms);
    }
    if (user) {
      fetchData();
    }
  }, [user, createModal]);

  return (
    <div className="flex flex-row w-screen">
      <Navbar />
      <div className="overflow-y-auto h-screen w-full">
        <div className="m-2 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Your Classrooms
          </h1>
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">View</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {classrooms.map((classroom) => (
              <Table.Row
                key={classroom.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {classroom.name}
                </Table.Cell>
                <Table.Cell>
                  <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href={`/adminclassrooms/${classroom.id}`}
                  >
                    <p>View</p>
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button
          type="button"
          onClick={setCreateModal}
          className=" m-5 flex flex-row"
        >
          <PlusIcon className="w-4" />
          <p className="inline">New Classroom</p>
        </Button>
        <NewClassroomAdminModal
          onCreateClose={onCreateClose}
          modal={createModal}
        />
      </div>
    </div>
  );
}
