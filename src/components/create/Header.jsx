import { Button, Tabs, Tooltip } from "flowbite-react";
import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../AuthContext";
import {
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { updateTableTitle } from "../../firebase_setup/table";
import { useNavigate } from "react-router-dom";
import Export from "./Export";
import Import from "./Import";

const Header = ({ data, title, tableId }) => {
  const [head, setHead] = useState(title);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleContentChange = (event) => {
    setHead(event.target.value);
  };

  const handleUpdateHeader = (event) => {
    updateTableTitle(user.uid, tableId, head);
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
          <textarea
            name="title"
            id="title"
            cols="30"
            rows="1"
            className=" bg-inherit border-none resize-none text-center text-ellipsis overflow-hidden whitespace-nowrap underline"
            value={head}
            onChange={(e) => handleContentChange(e)}
            maxLength={30}
            onBlur={(e) => handleUpdateHeader(e)}
          ></textarea>
        </div>
        <div className="flex flex-row pr-4">
          <Import />
          <Export user={user} tableId={tableId} />
        </div>
      </div>
    </>
  );
};

export default Header;
