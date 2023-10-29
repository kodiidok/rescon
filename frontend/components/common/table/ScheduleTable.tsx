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
import TableContent from "./TableContent";

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
  const [date, setDate] = useState("2023-11-04");
  const [sessionResults, setSessionResults] = useState<SearchResult[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  let debounceTimer: NodeJS.Timeout;

  const handleDateSelect = (selectedDate: string) => {
    setDate(selectedDate);
  };

  const handleCategorySelect = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      if (category) {
        const results = await getSessionByDate(date);

        const sessionItems: SearchResult[] = results
          .filter((session: Session) => session.category === category)
          .map((session: Session) => session.sessionItems);

        setSessionResults(sessionItems);
        setShowNoResults(false);
      } else {
        setSessionResults([]);
        setTimeout(() => {
          setShowNoResults(true);
        }, 20000);
      }
    }, 1000);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNoResults(false);
    }, 20000);

    return () => clearTimeout(timeoutId);
  }, [showNoResults]);

  useEffect(() => {
    console.log(sessionResults);
  }, [sessionResults]);

  return (
    <div className="w-4/5 mx-auto">
      <Button onClick={handleCategorySelect}>Click</Button>

      {sessionResults.length > 0
        ? sessionResults.map((result: any, index: number) => (
            <div key={index}>
              {result.map((sessionItem: any, sessionItemIndex: number) => (
                <div
                  style={{ margin: "10px" }}
                  key={sessionItemIndex}
                  className="sessionItem-item"
                >
                  {JSON.stringify(sessionItem)}
                </div>
              ))}
            </div>
          ))
        : showNoResults && <p>No search results found.</p>}
      <div>
        <div>
          <div className="text-center">
            <h1 className="text-5xl">Time Table</h1>
          </div>
          <Tabs aria-label="Options" color="primary">
            <Tab
              onClick={() => handleDateSelect("2023-11-03")}
              key="Day 1"
              title="Day 1"
            >
              <TableDetails
                title="Friday, 3rd November 2023"
                SessionID="YourSessionIDValue"
                location="YourLocationValue"
              />

              <TableContent />
              <TableDetails
                title="Lunch Break"
                SessionID="YourSessionIDValue"
                location="YourLocationValue"
              />

              <TableContent />
              <TableDetails
                title="Tea Break"
                SessionID="YourSessionIDValue"
                location="YourLocationValue"
              />

              <TableContent />
            </Tab>
            <Tab
              onClick={() => handleDateSelect("2023-11-04")}
              key="Day 2"
              title="Day 2"
            >
              <TableDetails
                title="Friday, 4th November 2023"
                SessionID="YourSessionIDValue"
                location="YourLocationValue"
              />
              <TableContent />
              <TableDetails
                title="Lunch Break"
                SessionID="YourSessionIDValue"
                location="YourLocationValue"
              />

              <TableContent />
              <TableDetails
                title="Tea Break"
                SessionID="YourSessionIDValue"
                location="YourLocationValue"
              />

              <TableContent />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
