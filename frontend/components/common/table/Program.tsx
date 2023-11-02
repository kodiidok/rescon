"use client";

import React from "react";
import cx from 'classnames';
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
// import { getSessionByDate } from "@/config/api";
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

export default function Program() {
  const [category, setCategory] = useState("Life Sciences");
  const [date, setDate] = useState("2023-11-03");
  // const [sessionItems, setSessionItems] = useState<SearchResult[]>([]);
  const [sessionResults, setSessionResults] = useState<Session[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [btnActive, setBtnActive] = useState(false);


  let debounceTimer: NodeJS.Timeout;

  async function getSessionByDate(date: string) {
    const res = await fetch(`/api/sessions/date/${date}`);
    if (!res.ok) {
      throw new Error("Failed to fetch session data");
    }
    return res.json();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getSessionByDate(date);

        const filteredSessions: Session[] = results.filter(
          (session: Session) => session.category === category
        );

        setSessionResults(filteredSessions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date, category]);

  const handleDateSelect = (selectedDate: string) => {
    setBtnActive(!btnActive);
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
    <div className="px-10">
      <CatSelect
        selectedCat={category}
        onCategoryChange={handleCategorySelect}
      />

      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-5xl font-semibold my-4">Program</h1>
        <div className="flex gap-3 items-center">
          <Button className={`font-semibold text-lg ${btnActive ? 'bg-slate-300 text-gray-900' : ''}`} onClick={() => handleDateSelect("2023-11-03")}>3rd</Button>
          <Button className={`font-semibold text-lg ${!btnActive ? 'bg-slate-300 text-gray-900' : ''}`} onClick={() => handleDateSelect("2023-11-04")}>4th</Button>
          <h2 className="text-2xl md:text-tiny">of November</h2>
        </div>
      </div>

      <div>
        {sessionResults && sessionResults.length > 0
          ? sessionResults.map((sessionArray: any, sessionIndex: number) => (
            <div className="mt-3" key={sessionIndex}>
              <TableTitle
                sessionId={sessionArray.sessionId}
                location={sessionArray.location}
                sessionChairs={sessionArray.sessionChairs}
                time={[sessionArray.startTime, sessionArray.endTime].join('-')}
              ></TableTitle>
              {/* {
                sessionArray.sessionItems &&
                  sessionArray.sessionItems.length > 0 ?
                  <SessionTable data={sessionArray.sessionItems} /> :
                  "No session items available"
              } */}
            </div>
          ))
          : "No session results available"}
      </div>
    </div>
  );
}
