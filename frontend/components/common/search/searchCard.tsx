import React from "react";
import styles from "./search.module.css";
import { SearchResult } from "./search"; // replace with the actual path
import cx from 'classnames';

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

  return (
    <div className={styles.container} key={result.id}>
      <div className={styles.left}>
        <p className="text-sm text-gray-400">{result.presenter}</p>
        <p className="text-sm">{result.title}</p>
      </div>
      <div className={`${styles.right} ${catColor}`}>
        <p>{result.abstractId}</p>
        <p>{result.sessionId}</p>
        <p className={styles.time}>{result.time}</p>
      </div>
    </div>
  );
};

export default SearchCard;
