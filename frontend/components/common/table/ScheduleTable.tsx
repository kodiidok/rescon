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

interface SessionTableProps {
  data: any;
}

function SessionTable({ data }: SessionTableProps) {
  console.log(data);
  
  const [first, ...rest] = Array.isArray(data) ? data : [];
  
  const sessionId = first.sessionId;
  const location = '';
  const sessionChairs = [];
  const panalDiscussions = [];
  const plenaryTalks = [];

  return (
    <div className="mt-3 px-3">



      <Table aria-label="Session Items Filtered by Date and Category">

        <TableHeader>
          <TableColumn>Time</TableColumn>
          <TableColumn>Abstract Id</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Presenter</TableColumn>
        </TableHeader>

        <TableBody>
          {
            data.map((item: any) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{[item.startTime, item.endTime].join('-')}</TableCell>
                  <TableCell>{item.abstractId}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.presenter}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  );
}

export default function ScheduleTable() {
  const tabdays = ["2023-11-03", "2023-11-04"];
  const sessionTimes = [""];
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

  // useEffect(() => {
  //   console.log(sessionResults);
  // }, [sessionResults]);

  return (
    <>
      <Button onClick={handleCategorySelect}>Click</Button>
      <div>
        {/* set date to format 'Friday, 3rd of November' */}
        <div>{date}</div>
        {
          sessionResults ?
            sessionResults?.map((itemArray: SearchResult, index: number) => (
              // itemArray contains all the session items data
              // that relates to the selected date and category
              <SessionTable key={index} data={itemArray} />
            ))
            : 'nothing here'
        }
      </div>
    </>
  );
}
