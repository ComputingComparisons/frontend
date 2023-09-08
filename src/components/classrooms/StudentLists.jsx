import React, { useState, useEffect, useContext } from "react";
import { Button, Table } from "flowbite-react";
import Navbar from "../Navbar";
import { getClassroomsByAdmin } from "../../firebase_setup/classroom";
import { getUsersByClassroom } from "../../firebase_setup/classroom"; // Import the function
import { useParams } from "react-router-dom";

export default function StudentLists() {
  const [users, setUsers] = useState([]); // State for users
  let params = useParams();

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsersByClassroom(params.classroomId); // Replace with the correct classroom ID
      setUsers(fetchedUsers);
    }
    fetchUsers();
  }, []);

  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {users.map((user) => (
          <Table.Row
            key={user.id}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {user.data.name}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {user.data.email}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
