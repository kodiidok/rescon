"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getSessionByDate } from "@/config/api";
// import { getSessionByCategory } from "@/config/api";
import { button } from "@nextui-org/theme";
import { SearchResult } from "../search/search";
import { Button } from "@nextui-org/react";
import TableDetails from "./TableTitle";
import SessionTable from "./SessionTable";
import CatSelect from "./CatSelect";
import TableTitle from "./TableTitle";

interface Session {
  id?: string;
  createdAt: string;
  updatedAt: string;
  startTime: string;
  endTime: string;
  date: string;
  sessionId: string;
  sessionChairIds: null | any[];
  sessionItemIds: string[];
  panalDiscussionIds: null | any[];
  plenaryTalkIds: null | any[];
  category: string;
  location: string;
  panalDiscussions: any[];
  sessionChairs: any[];
  sessionItems: SearchResult[];
}

export default function ScheduleTable() {
  const [category, setCategory] = useState("Life Sciences");
  const [date, setDate] = useState("2023-11-03");
  const [sessionResults, setSessionResults] = useState<SearchResult[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);

  let debounceTimer: NodeJS.Timeout;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getSessionByDate(date);

        const sessionItems: SearchResult[] = results
          .filter((session: Session) => session.category === category)
          .map((session: Session) => session.sessionItems);

        setSessionResults(sessionItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date, category]);

  const handleDateSelect = (selectedDate: string) => {
    setDate(selectedDate);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNoResults(false);
    }, 20000);

    return () => clearTimeout(timeoutId);
  }, [showNoResults]);

  return (
    <>
      <CatSelect
        selectedCat={category}
        onCategoryChange={handleCategorySelect}
      />

      <div className="text-center">
        <h1 className="text-5xl my-4">Time Table</h1>
        <Button onClick={() => handleDateSelect("2023-11-03")}>Day 1</Button>
        <Button onClick={() => handleDateSelect("2023-11-04")}>Day 2</Button>
      </div>

      <div>
        {sessionResults
          ? sessionResults.map((itemArray: any, itemIndex: number) => (
              // itemArray contains all the session items data
              // that relates to the selected date and category

              <div key={itemIndex}>
                <TableTitle
                  SessionID={itemArray[0].sessionId}
                  location={itemArray[0].location}
                ></TableTitle>

                <SessionTable key={itemIndex} data={itemArray} />
              </div>
            ))
          : "nothing here"}
      </div>
    </>
  );
}
