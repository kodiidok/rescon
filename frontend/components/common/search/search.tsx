"use client";

import { Input } from "@nextui-org/input";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
// import { searchSessionItems } from "@/config/api";
import SearchCard from "./searchCard";
import mockdata from "@/components/mock/abstracts.json";

export interface SearchResult {
  id?: string;
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
    /**
     * This is a search component with a
     * full text search algorithm
     */
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      if (searchQuery) {
        // const results = await searchSessionItems(searchQuery);
        const results = mockdata;
        const filteredResults = results.filter((item: any) => {
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
        });

        setSearchResults(filteredResults);
        setShowNoResults(false);
      } else {
        setSearchResults([]);
        setTimeout(() => {
          setShowNoResults(true);
        }, 20000);
      }
    }, 2000); // Debounce time set to 1000 milliseconds
  };

  useEffect(() => {
    if (!searchQuery || searchQuery === " ") {
      setSearchResults([]);
    } else {
      // handleSearch();
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
    <div className="flex flex-col gap-3">
      <Input
        placeholder="Search by title, abstract id, or presenter"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          // handleSearch();
        }}
      />
      <Button onClick={handleSearch}>Search</Button>

      {/* Display search results or a message if no results */}
      {searchQuery && searchResults.length > 0
        ? searchResults.map((result, index) => (
            <SearchCard result={result} index={index} />
          ))
        : showNoResults && <p>No search results found.</p>}
    </div>
  );
};
