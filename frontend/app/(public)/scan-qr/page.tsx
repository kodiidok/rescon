'use client'

import { getAllUsers, getSessionByCategory, getSessionByDate, getSessionItemBySessionId, searchSessionItems } from "@/config/api";
import { Image } from "@nextui-org/react";

export default async function Page() {

  // const data = {
  //   hint: 'import an api handler from @/config/api and test the api integration to view response data.'
  // };

  // const users = await getAllUsers(1, 10);

  return (
    <div>
      <Image src="QR/homeQR.svg" width={400} height={400} />
    </div>
  );
}