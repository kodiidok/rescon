'use client'

import { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState<any>([]);

  const data = {
    hint: 'import an api handler from @/config/api and test the api integration to view response data.'
  };

  async function getAllUsers(page: number, pageSize: number) {
    const res = await fetch(`/api/users?page=${page}&limit=${pageSize}`);
    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    return res.json();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getAllUsers(1, 10);

        setUsers(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      we test api&apos;s here!
      <div>
        {JSON.stringify(data)}
        {JSON.stringify(users)}
      </div>
    </div>
  );
}