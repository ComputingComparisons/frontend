import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { Tabs } from "flowbite-react";
import AuthContext from "../../AuthContext";

const Classroom = () => {
  let params = useParams();
  const navigate = useNavigate();
  const { user: contextUser } = useContext(AuthContext);
  return (
    <div className="flex flex-row w-screen">
      <Navbar />
      <div className="overflow-y-auto h-screen w-full">
        <Tabs.Group aria-label="Default tabs" style="default">
          <Tabs.Item active title="Templates">
            <p>
              This is
              <span className="font-medium text-gray-800 dark:text-white">
                Profile tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </p>
          </Tabs.Item>
          <Tabs.Item title="Dashboard">
            <p>
              This is
              <span className="font-medium text-gray-800 dark:text-white">
                Dashboard tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </p>
          </Tabs.Item>
          <Tabs.Item title="Settings">
            <p>
              This is
              <span className="font-medium text-gray-800 dark:text-white">
                Settings tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </p>
          </Tabs.Item>
          <Tabs.Item title="Contacts">
            <p>
              This is
              <span className="font-medium text-gray-800 dark:text-white">
                Contacts tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </p>
          </Tabs.Item>
          <Tabs.Item disabled title="Disabled">
            <p>Disabled content</p>
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
};

export default Classroom;
