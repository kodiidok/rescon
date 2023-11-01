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
import TableTitle from "./TableTitle";

interface SessionTableProps {
  data: any;
}

function SessionTable({ data }: SessionTableProps) {

  return (
    <div className="rounded-b-xl overflow-hidden">
      <Table radius="none" aria-label="Session Items Filtered by Date and Category">
        <TableHeader>
          <TableColumn>Time</TableColumn>
          <TableColumn>Abstract Id</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Presenter</TableColumn>
        </TableHeader>

        <TableBody>
          {data.map((item: any) => {
            return (
              <TableRow key={item.id}>
                <TableCell >
                  <div>{item.startTime.slice(0, -3)}</div>
                  <div>{item.endTime.slice(0, -3)}</div>
                </TableCell>
                <TableCell>{item.abstractId}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.presenter}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default SessionTable;
