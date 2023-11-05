import React, { useEffect, useState } from "react";
import styles from "./search.module.css";
import { SearchResult } from "./search"; // replace with the actual path
import cx from 'classnames';

interface Presenter {
  username: string,
  email: string,
  password: string,
  name: string,
  roleName: string,
  chairingSessionIds: [],
  nic: string,
  presentingSessionIds: [],
  institute: string,
  registered: boolean
}

const SearchCard = ({
  result,
  index,
}: {
  result: SearchResult;
  index: number;
}) => {

  const catColor = cx(
    result.sessionId.replace(/\d/g, '') === 'EES' ? 'bg-green-500' :
      result.sessionId.replace(/\d/g, '') === 'ICTMS' ? 'bg-blue-500' :
        result.sessionId.replace(/\d/g, '') === 'LS' ? 'bg-purple-500' :
          result.sessionId.replace(/\d/g, '') === 'PS' ? 'bg-pink-500' :
            result.sessionId.replace(/\d/g, '') === 'SE' ? 'bg-orange-500' : 'bg-zinc-700'
  );

  const [presenter, setPresenter] = useState<Presenter | null>(null);

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



  async function getUserById(id: string) {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    return res.json();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (result?.presenterId) {
          const presenterData = await getUserById(result.presenterId);
          setPresenter(presenterData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [result]);

  return (
    <div className={styles.container} key={result.id}>
      <div className={styles.left}>
        <p className="text-sm text-gray-400">{presenter?.name}</p>
        <p className="text-sm">{result.title}</p>
      </div>
      <div className={`${styles.right} ${catColor}`}>
        <p>{result.abstractId}</p>
        <p>{formatSessionId(result.sessionId)}</p>
        <p className={styles.time}>{result.time}</p>
      </div>
    </div>
  );
};

export default SearchCard;
