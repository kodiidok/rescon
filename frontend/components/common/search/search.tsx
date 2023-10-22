'use client'

import { Input } from "@nextui-org/input";
import mockdata from '@/components/mock/abstracts.json';
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";

interface SearchResult {
  time: string;
  abstractId: number;
  title: string;
  presenter: string;
  day: string;
  sessionId: number;
  sessionChairs: string[];
  category: string;
}

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  let debounceTimer: NodeJS.Timeout;

  const handleSearch = () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (searchQuery) {
        const filteredResults = mockdata.filter(
          (item) => {
            const lowerSearchQuery = searchQuery.toLowerCase();

            // Function to check if a word is included in another word
            const isWordIncluded = (fullWord: string, partialWord: string) =>
              fullWord.toLowerCase().includes(partialWord.toLowerCase());

            // Check if searchQuery is included in title, presenter, or abstractId
            const isMatch =
              isWordIncluded(item.title, lowerSearchQuery) ||
              isWordIncluded(String(item.abstractId), lowerSearchQuery) ||
              isWordIncluded(item.presenter, lowerSearchQuery);

            // If searchQuery is a number, check if it's included in abstractId
            const isNumberMatch =
              !isNaN(Number(lowerSearchQuery)) &&
              String(item.abstractId).includes(lowerSearchQuery);

            return isMatch || isNumberMatch;
          }
        );

        setSearchResults(filteredResults);
        setShowNoResults(false);
      } else {
        setSearchResults([]);
        setTimeout(() => {
          setShowNoResults(true);
        }, 20000);
      }
    }, 300); // Debounce time set to 300 milliseconds
  };

  useEffect(() => {
    if (!searchQuery || searchQuery === " ") {
      setSearchResults([]);
    } else {
      handleSearch();
    }
  }, [searchQuery]);

  // Clear "No results found" message after 20 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNoResults(false);
    }, 20000);

    return () => clearTimeout(timeoutId);
  }, [showNoResults]);

  return (
    <div>
      <Input
        placeholder="Search by title, abstract id, or presenter"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch();
        }}
      />
      <Button onClick={handleSearch}>Search</Button>

      {/* Display search results or a message if no results */}
      {searchQuery && searchResults.length > 0 ? (
        searchResults.map((result) => (
          <div key={result.abstractId}>
            <p>Title: {result.title}</p>
            <p>Abstract ID: {result.abstractId}</p>
            <p>Presenter: {result.presenter}</p>
            {/* Display other relevant information */}
          </div>
        ))
      ) : (
        showNoResults && <p>No search results found.</p>
      )}
    </div>
  );
};

