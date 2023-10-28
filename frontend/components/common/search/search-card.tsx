import React from "react";
import styles from "./search.module.css";
import { SearchResult } from "./search"; // replace with the actual path
import { log } from "console";
import { color } from "framer-motion";

const SearchCard = ({
  result,
  index,
}: {
  result: SearchResult;
  index: number;
}) => {
  const colors = ["red", "green", "yellow"];
  const right_color = "style."+colors[index % 5];

  return (
    <div className={styles.container} key={result.id}>
      <div className={styles.left}>
        <p className={styles.presenter}>{result.presenter}</p>
        <p>{result.title}</p>
      </div>
      <div className={right_color}>
        <p>{result.abstractId}</p>
        <p>{result.sessionId}</p>
        <p className={styles.time}>{result.time}</p>
      </div>
      {/* Display other relevant information */}
    </div>
  );
};

export default SearchCard;
