import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface SessionTableProps {
  data: any;
}

interface Presenter {
  username: string,
  email: string,
  password: string,
  name: string,
  roleName: string,
  chairingSessionIds: [],
  nic: string,
  presentingSessionIds: [],
  institute: string,
  registered: boolean
}

function SessionTable({ data }: SessionTableProps) {
  const [presenter, setPresenters] = useState<Presenter[]>([]);

  async function getUserById(id: string) {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    return res.json();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const presenterData = await Promise.all(
          data.map((item: any) => getUserById(item.presenterId))
        );
        setPresenters(presenterData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

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
          {data.map((item: any, index: number) => {
            return (
              <TableRow key={item.id}>
                <TableCell >
                  <div>{item.startTime.slice(0, -3)}</div>
                  <div>{item.endTime.slice(0, -3)}</div>
                </TableCell>
                <TableCell>{item.abstractId}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{presenter[index]?.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default SessionTable;
