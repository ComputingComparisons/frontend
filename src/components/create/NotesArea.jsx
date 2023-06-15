import React, { useState, useEffect } from "react";
import { Card, Textarea, Button } from "flowbite-react";

const NotesArea = ({ notes, setNotes, handleUpdateNotes }) => {
  const [rows, setRows] = useState(1);

  useEffect(() => {
    if (notes) {
      const initialRows = Math.floor(notes.split("\n").length);
      setRows(initialRows > 1 ? initialRows : 1);
    }
  }, [notes]);

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
    const currentRows = handleRowChange(event);
    setRows(currentRows);
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
    <>
      <p className=" font-bold">Notes:</p>
      <Textarea
        className="h-auto resize-none"
        
        value={notes}
        rows={rows}
        onChange={(e) => handleNotesChange(e)}
        onBlur={(e) => handleUpdateNotes(e)}
        placeholder="Use this space for notes, contexualization, or any ideas!"
      />
    </>
  );
};

export default NotesArea;
