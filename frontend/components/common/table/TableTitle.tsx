import React from "react";
import cx from 'classnames';

type TableDetailsProps = {
  time?: string;
  sessionId: string;
  location: string;
  sessionChairs: any[];
};

const TableTitle: React.FC<TableDetailsProps> = ({ sessionId, location, sessionChairs, time }) => {

  const [first, second] = sessionChairs;

  const catColor1 = cx(
    sessionId.replace(/\d/g, '') === 'EES' ? 'bg-green-400' :
      sessionId.replace(/\d/g, '') === 'ICTMS' ? 'bg-blue-400' :
        sessionId.replace(/\d/g, '') === 'LS' ? 'bg-purple-400' :
          sessionId.replace(/\d/g, '') === 'PS' ? 'bg-pink-400' :
            sessionId.replace(/\d/g, '') === 'SE' ? 'bg-orange-400' : 'bg-zinc-700'
  );

  const catColor2 = cx(
    sessionId.replace(/\d/g, '') === 'EES' ? 'bg-green-500' :
      sessionId.replace(/\d/g, '') === 'ICTMS' ? 'bg-blue-500' :
        sessionId.replace(/\d/g, '') === 'LS' ? 'bg-purple-500' :
          sessionId.replace(/\d/g, '') === 'PS' ? 'bg-pink-500' :
            sessionId.replace(/\d/g, '') === 'SE' ? 'bg-orange-500' : 'bg-zinc-700'
  );

  // Function to format session IDs
  function formatSessionId(sessionId: string) {
    // Use regular expression to match the pattern "EES1" or "PS6"
    const match = sessionId.match(/([A-Z]+)(\d+)/);

    // If there is a match, format the session ID as "EES-1" or "PS-6"
    if (match) {
      const [, prefix, number] = match;
      return `${prefix}-${number}`;
    }

    // If there is no match, return the original session ID
    return sessionId;
  }

  return (
    <div className="text-gray-900">
      <div className="text-center py-2 bg-gray-100 rounded-t-xl">
        {/* <h1 className="text-lg font-bold">{title}</h1> */}
      </div>
      <div className={`flex text-center py-2 px-6 ${catColor1}`}>
        <div className="w-1/2 text-left">
          <h1 className="text-xs font-bold">{time}</h1>
          <h1 className="font-bold">Session ID: {formatSessionId(sessionId)}</h1>
        </div>
        <div className="w-1/2 text-right">
          <h1 className="text-xs font-bold">Location</h1>
          <h1 className="font-extrabold text-xl">{location}</h1>
        </div>
      </div>
      <div className={`flex py-3 text-center text-sm ${catColor2}`}>
        <div className="w-1/3 font-bold">
          <h1>Session Chairs</h1>
        </div>
        <div className="w-1/3">
          <h1>{first.name}</h1>
        </div>
        <div className="w-1/3">
          <h1>{second.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default TableTitle;
