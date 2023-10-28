import React from "react";
import { SearchResult } from "./search"; // replace with the actual path

const SearchCard = ({ result }: { result: SearchResult }) => {
  return (
    <div key={result.id}>
      <p>Title: {result.title}</p>
      <p>Abstract ID: {result.abstractId}</p>
      <p>Presenter: {result.presenter}</p>
      {/* Display other relevant information */}
    </div>
  );
};

export default SearchCard;
