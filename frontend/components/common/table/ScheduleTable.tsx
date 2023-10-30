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
import { Button } from "@nextui-org/button";
import TableDetails from "./TableDetails";
import SessionTable from "./SessionTable";

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
  const sessionTimes = [""];
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

  const handleDateSelect = () => {
    if (date === "2023-11-03") {
      setDate("2023-11-04");
    } else {
      setDate("2023-11-03");
    }
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

  // useEffect(() => {
  //   console.log(sessionResults);
  // }, [sessionResults]);

  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl">Time Table</h1>
      </div>
      <Tabs
        aria-label="Options"
        color="primary"
        onClick={() => handleDateSelect()}
      >
        {[0, 1].map((index) => (
          <Tab key={index} title={`Day ${index + 1}`}>
            <div>
              {sessionResults
                ? sessionResults.map(
                    (itemArray: SearchResult, itemIndex: number) => (
                      // itemArray contains all the session items data
                      // that relates to the selected date and category

                      <SessionTable key={itemIndex} data={itemArray} />

                    )
                  )
                : "nothing here"}
            </div>
          </Tab>
        ))}
      </Tabs>
    </>
  );
}
