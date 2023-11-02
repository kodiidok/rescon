"use client";

import { Input } from "@nextui-org/input";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
// import { searchSessionItems } from "@/config/api";
import SearchCard from "./searchCard";
// import mockdata from "@/components/mock/abstracts.json";

export interface SearchResult {
  id?: string;
  time: string;
  abstractId: number;
  title: string;
  presenter: string;
  day: string;
  sessionId: string;
  sessionChairs: any[];
  panalDiscussions: any[];
  plenaryTalks: any[];
  category: string;
  via: string;
}

interface PanalDiscussions {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sessionId: string;
  startTime: string;
  endTime: string;
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

    async function searchSessionItems(query: string) {
      const queryString = encodeURIComponent(query);
      const res = await fetch(`/api/session-items/search?q=${queryString}`);
      if (!res.ok) {
        throw new Error("Failed to search session item data");
      }
      return res.json();
    }

    debounceTimer = setTimeout(async () => {
      if (searchQuery) {
        const results = await searchSessionItems(searchQuery);
        const searchWords = searchQuery.toLowerCase().split(' ');
        // const results = mockdata;
        const filteredResults = results.filter((item: any) => {
          // Function to check if any part of a word is included in another word
          const isPartialWordIncluded = (fullWord: string, partialWord: string) =>
            fullWord.toLowerCase().includes(partialWord.toLowerCase());

          // Check if any part of searchQuery is included in title, presenter, or abstractId
          const isMatch =
            searchWords.some((word) =>
              isPartialWordIncluded(item.sessionId, word) ||
              isPartialWordIncluded(item.title, word) ||
              isPartialWordIncluded(String(item.abstractId), word) ||
              isPartialWordIncluded(item.presenter, word)
            );

          // If searchQuery is a number, check if it's included in abstractId
          const isNumberMatch =
            !isNaN(Number(searchQuery)) &&
            String(item.abstractId).includes(searchQuery);

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
    }, 1000); // Debounce time set to 1000 milliseconds
  };

  useEffect(() => {
    if (!searchQuery || searchQuery === " ") {
      setSearchResults([]);
    } else {
      // handleSearch();
    }
  }, [searchQuery]);

  // useEffect(() => {
  //   console.log(searchResults);
  // }, [searchResults]);

  // Clear "No results found" message after 20 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNoResults(false);
    }, 20000);

    return () => clearTimeout(timeoutId);
  }, [showNoResults]);

  return (
    <div style={{width: '90vw', maxWidth: '63rem'}} className="flex flex-col gap-3 px-5 items-center">
      <Input
        placeholder="Search by title, abstract id, or presenter"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          // handleSearch();
        }}
      />
      <Button style={{width: '100%'}} className="hover:bg-lime-500 hover:text-gray-800 font-semibold text-xl" onClick={handleSearch}>Search</Button>

      {/* Display search results or a message if no results */}
      {searchQuery && searchResults.length > 0
        ? searchResults.map((result, index) => (
          <SearchCard key={index} result={result} index={index} />
        ))
        : showNoResults && <p>No search results found.</p>}
    </div>
  );
};
