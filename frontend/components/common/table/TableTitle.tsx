import React from "react";

type TableDetailsProps = {
  SessionID: string;
  location: string;
};

const TableTitle: React.FC<TableDetailsProps> = ({ SessionID, location }) => {
  return (
    <div>
      <div className="text-center py-2 bg-gray-100 rounded-tl-xl rounded-tr-xl">
        {/* <h1 className="text-lg font-bold">{title}</h1> */}
      </div>
      <div className="flex text-center py-2 px-6 bg-blue-200">
        <div className="w-1/2 text-left">
          <h1 className="text-xs font-bold">Time</h1>
          <h1 className="font-bold">Session ID: {SessionID}</h1>
        </div>
        <div className="w-1/2 text-right">
          <h1 className="text-xs font-bold">Location</h1>
          <h1 className="font-extrabold text-xl">{location}</h1>
        </div>
      </div>
      <div className="flex py-1 text-center text-xs">
        <div className="w-1/3 font-bold">
          <h1>Session Chairs</h1>
        </div>
        <div className="w-1/3">
          <h1>Chair 1</h1>
        </div>
        <div className="w-1/3">
          <h1>Chari 2</h1>
        </div>
      </div>
    </div>
  );
};

export default TableTitle;
