import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../AuthContext";
import Column from "./Column";
import EditableTable from "./table/EditableTable";
import { useParams } from "react-router-dom";
import { getTableById2, updateTableNotes } from "../firebase_setup/table";
import { Spinner, Textarea, TextInput } from "flowbite-react";
import BottomButtons from "./create/BottomButtons";
import Header from "./create/Header";
import NotesArea from "./create/NotesArea";
import { debounce } from "lodash";

const Create = () => {
  let params = useParams();
  const [tableData, setTableData] = useState();
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState(null);

  const { user: contextUser } = useContext(AuthContext);

  useEffect(() => {
    if (contextUser) {
      setUser(contextUser);
    }
  }, [contextUser]);

  const tableSlug = "myTable";

  useEffect(() => {
    async function fetchData() {
      setTableData(
        await getTableById2(user.uid, params.analogId, params.indId)
      );
    }

    console.log(user);
    if (user) {
      fetchData();
    }
  }, [user, params]);

  useEffect(() => {
    if (tableData) {
      setNotes(tableData.notes);
    }
  }, [tableData]);

  const handleUpdateNotes = (event) => {
    updateTableNotes(user.uid, params.analogId, notes);
  };

  const debouncedUpdateTableNotes = debounce((user, analogId, indId, notes) => {
    updateTableNotes(user, analogId, indId, notes);
  }, 10000); // 10000 milliseconds = 10 seconds

  useEffect(() => {
    if (user && notes) {
      updateTableNotes(user.uid, params.analogId, params.indId, notes);
    }
  }, [tableData, user, debouncedUpdateTableNotes]);

  return (
    <>
      {tableData ? (
        <>
          <div className="flex flex-col container relative h-auto mx-auto">
            <div className="fixed top-0 left-0 w-full z-50">
              <Header
                title={tableData.title}
                tableId={params.analogId}
                indId={params.indId}
              />
            </div>
            <div className=" flex flex-col pb-16 pt-10">
              <EditableTable
                data={tableData.data.map((obj) => Object.values(obj))}
                slug={tableSlug}
                user={user}
                tableId={params.analogId}
                indId={params.indId}
              ></EditableTable>
              <NotesArea
                notes={notes}
                setNotes={setNotes}
                handleUpdateNotes={handleUpdateNotes}
              />
            </div>
            {/*<BottomTabs className="absolute bottom-0 left-0" />*/}
            <div className="fixed bottom-0 left-0 w-full z-50">
              <BottomButtons className="" user={user} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex w-screen h-screen justify-center">
          <div className="self-center">
            <Spinner aria-label="Default status example" size="xl" />
          </div>
        </div>
      )}
    </>
  );
};

export default Create;
