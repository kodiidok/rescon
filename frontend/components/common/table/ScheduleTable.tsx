"use client";

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tabs, Tab } from "@nextui-org/react";

export default function ScheduleTable() {
  return (
    <div className="w-4/5 mx-auto">
      <div>
        <div>
          <div className="text-center">
            <h1 className="text-5xl">Time Table</h1>
          </div>
          <Tabs aria-label="Options" color="primary">
            <Tab key="Day 1" title="Day 1">
              <div className="text-center py-2 bg-gray-100 rounded-tl-xl rounded-tr-xl"><h1 className="text-lg font-bold">Friday, 3rd November 2023</h1></div>
              <div className="flex text-center py-2 px-6 bg-blue-200">
                <div className="w-1/2 text-left">
                  <h1 className="text-xs font-bold">Time</h1>
                  <h1 className="font-bold">Session ID: ICTMS1</h1>
                </div>
                <div className="w-1/2 text-right">
                  <h1 className="text-xs font-bold">Location</h1>
                  <h1 className="font-extrabold text-xl">A3.2</h1>
                </div>
              </div>

              <div className="flex py-1 text-center text-xs">
                <div className="w-1/3 font-bold"><h1>Session Chairs</h1></div>
                <div className="w-1/3"><h1>Prof. AAI Perera</h1></div>
                <div className="w-1/3"><h1>Dr. PGRS Ranasinghe</h1></div>
              </div>

              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Time</TableColumn>
                  <TableColumn>Abstract Id</TableColumn>
                  <TableColumn>Title</TableColumn>
                  <TableColumn>Presenter</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                    <TableCell>Vacation</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="py-4 text-center"><h1 className="text-lg font-bold">Lunch Break</h1></div>
              <div className="flex text-center py-2 px-6 bg-blue-200">
                <div className="w-1/2 text-left">
                  <h1 className="text-xs font-bold">Time</h1>
                  <h1 className="font-bold">Session ID: ICTMS2</h1>
                </div>
                <div className="w-1/2 text-right">
                  <h1 className="text-xs font-bold">Location</h1>
                  <h1 className="font-extrabold text-xl">A3.2</h1>
                </div>
              </div>
              
              <div className="flex py-1 text-center text-xs">
                <div className="w-1/3 font-bold"><h1>Session Chairs</h1></div>
                <div className="w-1/3"><h1>Prof. AAI Perera</h1></div>
                <div className="w-1/3"><h1>Dr. PGRS Ranasinghe</h1></div>
              </div>

              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Time</TableColumn>
                  <TableColumn>Abstract Id</TableColumn>
                  <TableColumn>Title</TableColumn>
                  <TableColumn>Presenter</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                    <TableCell>Vacation</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="py-4 text-center"><h1 className="text-lg font-bold">Tea Break</h1></div>
              <div className="flex text-center py-2 px-6 bg-blue-200">
                <div className="w-1/2 text-left">
                  <h1 className="text-xs font-bold">Time</h1>
                  <h1 className="font-bold">Session ID: ICTMS2</h1>
                </div>
                <div className="w-1/2 text-right">
                  <h1 className="text-xs font-bold">Location</h1>
                  <h1 className="font-extrabold text-xl">A3.2</h1>
                </div>
              </div>
              
              <div className="flex py-1 text-center text-xs">
                <div className="w-1/3 font-bold"><h1>Session Chairs</h1></div>
                <div className="w-1/3"><h1>Prof. AAI Perera</h1></div>
                <div className="w-1/3"><h1>Dr. PGRS Ranasinghe</h1></div>
              </div>

              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Time</TableColumn>
                  <TableColumn>Abstract Id</TableColumn>
                  <TableColumn>Title</TableColumn>
                  <TableColumn>Presenter</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                    <TableCell>Vacation</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Tab>
            <Tab key="Day 2" title="Day 2">
              <div className="text-center py-2 bg-gray-100 rounded-tl-xl rounded-tr-xl"><h1 className="text-lg font-bold">Friday, 4th November 2023</h1></div>
              <div className="flex text-center py-2 px-6 bg-blue-200">
                <div className="w-1/2 text-left">
                  <h1 className="text-xs font-bold">Time</h1>
                  <h1 className="font-bold">Session ID: ICTMS1</h1>
                </div>
                <div className="w-1/2 text-right">
                  <h1 className="text-xs font-bold">Location</h1>
                  <h1 className="font-extrabold text-xl">A3.2</h1>
                </div>
              </div>

              <div className="flex py-1 text-center text-xs">
                <div className="w-1/3 font-bold"><h1>Session Chairs</h1></div>
                <div className="w-1/3"><h1>Prof. AAI Perera</h1></div>
                <div className="w-1/3"><h1>Dr. PGRS Ranasinghe</h1></div>
              </div>

              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Time</TableColumn>
                  <TableColumn>Abstract Id</TableColumn>
                  <TableColumn>Title</TableColumn>
                  <TableColumn>Presenter</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Sahan</TableCell>
                    <TableCell>CEO</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Lakshitha</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Yasela</TableCell>
                    <TableCell>Senior Developer</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>Supul</TableCell>
                    <TableCell>Community Manager</TableCell>
                    <TableCell>Vacation</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="py-4 text-center"><h1 className="text-lg font-bold">Lunch Break</h1></div>
              <div className="flex text-center py-2 px-6 bg-blue-200">
                <div className="w-1/2 text-left">
                  <h1 className="text-xs font-bold">Time</h1>
                  <h1 className="font-bold">Session ID: ICTMS1</h1>
                </div>
                <div className="w-1/2 text-right">
                  <h1 className="text-xs font-bold">Location</h1>
                  <h1 className="font-extrabold text-xl">A3.2</h1>
                </div>
              </div>
              
              <div className="flex py-1 text-center text-xs">
                <div className="w-1/3 font-bold"><h1>Session Chairs</h1></div>
                <div className="w-1/3"><h1>Prof. AAI Perera</h1></div>
                <div className="w-1/3"><h1>Dr. PGRS Ranasinghe</h1></div>
              </div>

              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Time</TableColumn>
                  <TableColumn>Abstract Id</TableColumn>
                  <TableColumn>Title</TableColumn>
                  <TableColumn>Presenter</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                    <TableCell>Vacation</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Tab>

          </Tabs>
        </div>
      </div>

    </div>
  );
}
