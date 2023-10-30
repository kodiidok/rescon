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

interface SessionTableProps {
  data: any;
}

function SessionTable({ data }: SessionTableProps) {
  console.log(data);
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
          {data.map((item: any) => {
            return (
              <TableRow key={item.id}>
                <TableCell>
                  {[item.startTime, item.endTime].join("-")}
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
