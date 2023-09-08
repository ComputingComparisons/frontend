import React, { useState, useEffect, useContext } from "react";
import { Button, Table } from "flowbite-react";
import Navbar from "../Navbar";
import {
  getClassroomsByAdmin,
  getTemplatesByClassroom,
} from "../../firebase_setup/classroom";
import { getUsersByClassroom } from "../../firebase_setup/classroom"; // Import the function
import { useParams } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import AuthContext from "../../AuthContext";
import NewTemplateModal from "./NewTemplateModal";

export default function Templates() {
  const [templates, setTemplates] = useState([]); // State for users
  let params = useParams();
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
    async function fetchUsers() {
      const fetchedTemplates = await getTemplatesByClassroom(
        params.classroomId
      );
      setTemplates(fetchedTemplates);
    }
    fetchUsers();
  }, [createModal]);

  return (
    <>
      <Table>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Use</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {templates.map((template) => (
            <Table.Row
              key={template.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {template.data.title}
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  href={`/adminclassrooms/${""}`}
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
        onClick={onCreateClick}
        className=" m-5 flex flex-row"
      >
        <PlusIcon className="w-4" />
        <p className="inline">Add Template</p>
      </Button>
      <NewTemplateModal onCreateClose={onCreateClose} modal={createModal} />
    </>
  );
}
