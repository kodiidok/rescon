import React from "react";
import styles from "../search.module.css";
import { SearchResult } from "./search"; // replace with the actual path
import { log } from "console";



const SearchCard = ({ result }: { result: SearchResult }) => {
 
  return (
    <div className={styles.container} key={result.id}>
      <div className={styles.left}>
        <p className={styles.presenter}>{result.presenter}</p>
        <p >{result.title}</p>
      </div>
      <div className={styles.right}>
        <p>{result.abstractId}</p>
        <p>{result.sessionId}</p>
        <p className={styles.time}>{result.time}</p>
      </div>
      {/* Display other relevant information */}
    </div>
  );
};

export default SearchCard;


