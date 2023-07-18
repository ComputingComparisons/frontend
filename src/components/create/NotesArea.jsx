import React, { useState, useEffect, useCallback } from "react";
import { Card, Textarea, Button } from "flowbite-react";
import { TextareaAutosize } from "react-autosize-textarea/lib/TextareaAutosize";
import { updateTableNotes } from "../../firebase_setup/table";
import { debounce } from "lodash";

const NotesArea = ({ notes, user, tableId, indId }) => {
  const [notesValue, setNotesValue] = useState();

  const handleNotesChange = (e) => {
    setNotesValue(e.target.value);
  };

  useEffect(() => {
    setNotesValue(notes);
  }, [notes]);

  const debouncedUpdateNotes = useCallback(
    debounce(() => {
      if (user && notesValue) {
        updateTableNotes(user.uid, tableId, indId, notesValue);
        console.log("yo");
      }
    }, 2000),
    [notesValue, user]
  ); // 1000 milliseconds = 1 second

  useEffect(() => {
    debouncedUpdateNotes();
    return debouncedUpdateNotes.cancel; // cleanup function
  }, [notesValue, user, tableId, debouncedUpdateNotes]);

  return (
    <>
      <p className=" font-bold">Notes:</p>
      <TextareaAutosize
        className="rounded-lg bg-gray-100"
        value={notesValue}
        rows={5}
        onChange={(e) => handleNotesChange(e)}
        placeholder="Use this space for notes, contexualization, or any ideas!"
      />
    </>
  );
};

export default NotesArea;
