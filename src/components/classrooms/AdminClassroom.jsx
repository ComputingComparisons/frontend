import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { Spinner, Tabs } from "flowbite-react";
import AuthContext from "../../AuthContext";
import { getClassroomById } from "../../firebase_setup/classroom";
import StudentLists from "./StudentLists";
import Templates from "./Templates";

const AdminClassroom = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState();
  const [user, setUser] = useState(null);
  const { user: contextUser } = useContext(AuthContext);
  useEffect(() => {
    if (contextUser) {
      setUser(contextUser);
    }
  }, [contextUser]);

  useEffect(() => {
    async function fetchData() {
      const fetchedClassroom = await getClassroomById(params.classroomId);
      setClassroom(fetchedClassroom);
    }
    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="flex flex-row w-screen">
      <Navbar />
      <div className="overflow-y-auto h-screen w-full">
        {classroom ? (
          <>
            <div class="m-2 text-center sm:text-left">
              <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome to {classroom.name}
              </h1>
            </div>
            <Tabs.Group aria-label="Default tabs" style="default">
              <Tabs.Item active title="Students">
                <StudentLists />
              </Tabs.Item>
              <Tabs.Item title="Templates">
                <Templates />
              </Tabs.Item>
              <Tabs.Item title="Settings">
                <p>
                  This is
                  <span className="font-medium text-gray-800 dark:text-white">
                    Settings tab's associated content
                  </span>
                  . Clicking another tab will toggle the visibility of this one
                  for the next. The tab JavaScript swaps classes to control the
                  content visibility and styling.
                </p>
              </Tabs.Item>
            </Tabs.Group>
          </>
        ) : (
          <div className="flex h-full w-full w- justify-center overflow-clip">
            <div className="self-center">
              <Spinner aria-label="Default status example" size="xl" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClassroom;
