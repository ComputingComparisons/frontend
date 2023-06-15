import React from "react";

const RemoveColumn = ({ row, removeColumn }) => {
  return (
    <tr>
      <td />
      {row[0].map((_, index) => (
        <td
          className="delete-cell bg-red-500 text-white hover:bg-red-600 cursor-pointer"
          key={`remove-col-${index}`}
          data-column={index}
          onClick={removeColumn}
        >
          Delete
        </td>
      ))}
    </tr>
  );
};

export default RemoveColumn;
