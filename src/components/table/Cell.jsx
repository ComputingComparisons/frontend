import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Cell = ({ cell, rowIndex, cellIndex, handleEditData }) => {
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <td
      className={` w-64 h-auto border border-gray-400 p-4 relative whitespace-pre-wrap ${
        hasFocus ? "has-focus" : ""
      } ${rowIndex == 0 ? "border-none" : ""} ${
        rowIndex % 2 == 0 && rowIndex != 0 ? "bg-gray-100" : "bg-white"
      } ${cellIndex == 2 ? "lg:w-96" : ""} `}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
    >
      <textarea
        className={`absolute top-0 left-0 w-full h-full bg-inherit resize-none overflow-hidden ${
          hasFocus ? "focus:ring-2 focus:z-30 focus:ring-blue-600" : ""
        } ${rowIndex == 0 ? "border-none underline text-center" : ""}`}
        data-row={rowIndex}
        data-column={cellIndex}
        onChange={(e) => handleEditData(e, { rowIndex, cellIndex })}
        value={cell}
        rows={5}
      />
      {cell}&nbsp;
    </td>
  );
};

export default Cell;
