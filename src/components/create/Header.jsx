import { Button, Tabs, Tooltip } from "flowbite-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../AuthContext";
import {
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import {
  getMainTitle,
  updateMainTitle,
  updateTableTitle,
} from "../../firebase_setup/table";
import { useNavigate } from "react-router-dom";
import Export from "./Export";
import Import from "./Import";

const Header = ({ title, tableId, indId }) => {
  const [mainTitle, setMainTitle] = useState("");
  const [head, setHead] = useState(title);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMainTitle = async () => {
      try {
        setMainTitle(await getMainTitle(user.uid, tableId));
      } catch (error) {
        console.error("Error fetching main title: ", error);
      }
    };
    fetchMainTitle();
  }, [user.uid]);

  const handleContentChange = (event) => {
    setHead(event.target.value);
  };

  const handleUpdateHeader = (event) => {
    updateTableTitle(user.uid, tableId, indId, head);
  };

  const handleMainTitleChange = (event) => {
    setMainTitle(event.target.value);
  };

  const handleUpdateMainTitle = (event) => {
    updateMainTitle(user.uid, tableId, mainTitle);
  };

  return (
    <>
      <div className="flex flex-row h-auto bg-slate-100 pb-2 pt-2  border-b border-slate-400 z-50 justify-between">
        <HomeIcon
          className=" pl-4 w-10 rounded-full cursor-pointer"
          color="#6F716F"
          onClick={(e) => navigate("/")}
        />
        <div className="flex flex-row">
          <div className="flex flex-row">
            <textarea
              name="mainTitle"
              id="mainTitle"
              cols="20"
              rows="1"
              className=" bg-inherit border-none resize-none text-right text-ellipsis overflow-hidden whitespace-nowrap underline lg:text-xl md:text-lg text-sm"
              value={mainTitle}
              onChange={(e) => handleMainTitleChange(e)}
              maxLength={25}
              onBlur={(e) => handleUpdateMainTitle(e)}
            ></textarea>
          </div>
          <p className=" self-center text-xl">/</p>
          <div className="flex flex-row">
            <textarea
              name="title"
              id="title"
              cols="20"
              rows="1"
              className=" bg-inherit border-none resize-none text-left text-ellipsis overflow-hidden whitespace-nowrap underline lg:text-xl md:text-lg text-sm"
              value={head}
              onChange={(e) => handleContentChange(e)}
              maxLength={25}
              onBlur={(e) => handleUpdateHeader(e)}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-row pr-4">
          <Import user={user} tableId={tableId} />
          <Export user={user} tableId={tableId} />
        </div>
      </div>
    </>
  );
};

export default Header;
