import React, { useState, useEffect, useCallback } from "react";
import Row from "./Row";
import RemoveColumn from "./RemoveColumn";
import { updateTableData } from "../../firebase_setup/table";
import { Button } from "flowbite-react";
import { PlusIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { debounce } from "lodash";
import DeleteRowModal from "./DeleteRowModal.jsx";

const EditableTable = ({ data, slug, user, tableId, indId }) => {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleAddRow = () => {
    let updatedTableData;
    setTableData((table) => {
      let length = table[0] ? table[0].length : 1;
      const row = [Array(length).fill("")];
      updatedTableData = table.concat(row);
      updateTableData(user.uid, tableId, indId, updatedTableData);
      return updatedTableData;
    });
    console.log(updatedTableData);
    //await updateTableData(user.uid, tableId, updatedTableData);
  };

  const handleAddColumn = () => {
    setTableData((table) => {
      return table.map((row) => row.concat(""));
    });
    //updateTableData(user.uid, tableId, tableData);
  };

  const handleRemoveRow = (rowIndex) => {
    let updatedTableData;
    setTableData((table) => {
      updatedTableData = [
        ...table.slice(0, rowIndex),
        ...table.slice(rowIndex + 1),
      ];
      updateTableData(user.uid, tableId, indId, updatedTableData);
      return updatedTableData;
    });

    //console.log(updatedTableData);
    //await updateTableData(user.uid, tableId, updatedTableData);
  };

  const handleRemoveColumn = async (e) => {
    const columnIndex = Number(e.currentTarget.dataset.column);
    setTableData((table) =>
      table.map((row) => {
        return [...row.slice(0, columnIndex), ...row.slice(columnIndex + 1)];
      })
    );
    await updateTableData(user.uid, tableId, indId, tableData);
  };

  const handleEditData = (event) => {
    const {
      currentTarget: {
        dataset: { row, column },
      },
      target: { value },
    } = event;

    setTableData((table) => {
      let updatedRow = table.filter(
        (item, i) => parseInt(i) === parseInt(row)
      )[0];
      updatedRow[column] = value;
      return table.map((item, i) => (item[column] === row ? updatedRow : item));
    });
  };

  const debouncedUpdateTable = useCallback(
    debounce(() => {
      if (user && tableData) {
        updateTableData(user.uid, tableId, indId, tableData);
      }
    }, 1000),
    [tableData, user]
  ); // 1000 milliseconds = 1 second

  useEffect(() => {
    debouncedUpdateTable();
    return debouncedUpdateTable.cancel; // cleanup function
  }, [tableData, user, tableId, debouncedUpdateTable]);

  return (
    <div className="p-8">
      {tableData.length ? (
        <table>
          <thead>
            <th></th>
            <th>Target</th>
            <th></th>
            <th>Source</th>
            <th>Nuances</th>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <>
                <Row
                  key={`row-${index}`}
                  handleEditData={handleEditData}
                  rowIndex={index}
                  row={row}
                  handleRemoveRow={handleRemoveRow}
                />
              </>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Please add rows and columns</div>
      )}
      <input type="hidden" name={slug} value={JSON.stringify(tableData)} />
      <div className="flex flex-row">
        <Button
          type="button"
          onClick={handleAddRow}
          className=" ml-8 my-1 flex flex-row"
        >
          <PlusIcon className="w-4" />
          <p className="hidden lg:inline">Add Row</p>
        </Button>
        <Button className="ml-2 my-1 flex flex-row">
          <DocumentDuplicateIcon className="w-4" />
          <p className="hidden lg:inline">Import Target</p>
        </Button>
      </div>
    </div>
  );
};

export default EditableTable;
