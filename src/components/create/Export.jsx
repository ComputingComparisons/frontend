import { Button, Tabs, Tooltip } from "flowbite-react";
import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../AuthContext";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import {
  getIndividualAnalogies,
  getTableById,
  updateTableTitle,
} from "../../firebase_setup/table";
import { useNavigate } from "react-router-dom";

const Export = ({ tableId, user }) => {
  const getTableData = async () => {
    try {
      const data = await getTableById(user.uid, tableId);
      //const parsedData = JSON.parse(data);
      const allAnalogies = await getIndividualAnalogies(user.uid, tableId);
      data.individualCollection = allAnalogies;
      const jsonData = JSON.stringify(data);
      const element = document.createElement("a");
      const file = new Blob([jsonData], { type: "application/json" });
      const fileName = `${data.title}.json`; // Use the 'title' field as the document name
      element.href = URL.createObjectURL(file);
      element.download = fileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error("Error while downloading table:", error);
    }
  };
  return (
    <>
      <Button disabled={false} onClick={getTableData}>
        <ArrowUpOnSquareIcon className=" lg:mr-2 h-5 w-5" />
        <p className="hidden lg:inline">Export</p>
      </Button>
    </>
  );
};

export default Export;
