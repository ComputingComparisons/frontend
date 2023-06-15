import React, { useState } from "react";
import { Card, Textarea, Button } from "flowbite-react";
import Cell from "./Cell";
//import { firestore } from "./firebaseConfig";

const Column = ({ title, data }) => {
  const [cellData, setCellData] = useState(data);

  const handleCellChange = (index, header, content) => {
    const updatedCellData = [...cellData];
    updatedCellData[index] = { header, content };

    setCellData(updatedCellData);
    //firestore.collection("columns").doc(title).set({ data: updatedCellData });
  };

  const handleAddCell = (e) => {
    const newData = cellData.concat([
      {
        header: "Header new",
        content: "Content new",
      },
    ]);
    setCellData(newData);
  };

  const handleDeleteCell = (e) => {
    const newData = cellData.concat([
      {
        header: "Header new",
        content: "Content new",
      },
    ]);
    setCellData(newData);
  };

  const handleClick = (e) => {
    if (e.type === "contextmenu") {
      handleDeleteCell(e);
    }
  };

  return (
    <div className=" max-w-sm p-2">
      <Card>
        <table>
          <thead className="w-full flex justify-center">
            <h3 className=" text-lg">{title}</h3>
          </thead>
          <tbody className="w-full">
            {cellData.map((d) => (
              <div onClick={(e) => handleClick(e)}>
                <Cell header={d.header} content={d.content} />
              </div>
            ))}
          </tbody>
        </table>

        <Button className="w-full" onClick={(e) => handleAddCell(e)}>
          {" "}
          +{" "}
        </Button>
      </Card>
    </div>
  );
};

export default Column;
