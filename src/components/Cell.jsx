import React, { useState } from "react";
import { Card, Textarea, Button } from "flowbite-react";

const Cell = ({ header, content }) => {
  const [head, setHead] = useState(header);
  const [cont, setCont] = useState(content);
  const [rows, setRows] = useState(1);
  const [rows1, setRows1] = useState(1);

  const handleHeaderChange = (event) => {
    setHead(event.target.value);
    const currentRows = handleRowChange(event);
    setRows(currentRows);
  };

  const handleContentChange = (event) => {
    setCont(event.target.value);
    const currentRows = handleRowChange(event);
    setRows1(currentRows);
  };

  const handleRowChange = (event) => {
    const textareaLineHeight = 24; // adjust this value to match your line-height CSS
    const previousRows = event.target.rows;
    event.target.rows = 1; // reset the number of rows to 1
    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }
    return currentRows;
  };

  return (
    <tr>
      <td className=" border border-black">
        <h3></h3>

        <Textarea
          className=" resize-none rounded-none border-none underline"
          rows={rows}
          value={head}
          onChange={(e) => handleHeaderChange(e)}
        />
        <Textarea
          className="resize-none h-auto rounded-none border-none"
          rows={rows1}
          value={cont}
          onChange={(e) => handleContentChange(e)}
        />
      </td>
    </tr>
  );
};

export default Cell;
