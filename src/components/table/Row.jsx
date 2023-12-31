import React, { useState}  from "react";
import Cell from "./Cell";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "flowbite-react";
import DeleteRowModal from "./DeleteRowModal";

const Row = ({ row, rowIndex, handleEditData, handleRemoveRow}) => {
  const [rowModal, setRowModal] = useState(false);

  const onDeleteRowClose = (e) => {
    setRowModal(false);
  };

  const onDeleteRowOpen = (e) => {
    setRowModal(true);
  };

  return (
    <>
    <tr
      className={`${
        rowIndex % 2 == 0 && rowIndex != 0 ? "bg-gray-100" : "bg-white"
      }`}
    >
      <td
        className={`delete-cell bg-white text-white hover:bg-gray-100  w-8 ${
          rowIndex == 0 ? " hover:bg-white cursor-auto h-10" : "cursor-pointer"
        }`}
        data-row={rowIndex}
        onClick={rowIndex == 0 ? null : onDeleteRowOpen}
      >
        <Tooltip
          content="Delete Row"
          className={`${rowIndex == 0 ? "hidden" : ""}`}
        >
          <TrashIcon
            className={`h-5 hover:opacity-75 ${rowIndex == 0 ? "hidden" : ""}`}
            color="#D6D7D6"
          />
        </Tooltip>
      </td>
      {row.map((cell, index) => (
        <>
          <Cell
            key={`cell-${index}-${rowIndex}`}
            handleEditData={handleEditData}
            rowIndex={rowIndex}
            cellIndex={index}
            cell={cell}
          />

          {index == 0 ? (
            <td className="h-full">
              <p className={`mx-3`}>{rowIndex == 0 ? "" : "is like"}</p>
            </td>
          ) : null}
        </>
      ))}
    </tr>
    <DeleteRowModal
        modal={rowModal}
        onDeleteRowClose={onDeleteRowClose}
        handleRemoveRow={handleRemoveRow}
        rowIndex={rowIndex}
      />
    </>
  );
};

export default Row;
