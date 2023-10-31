import { getAllUsers, getSessionByCategory, getSessionByDate, getSessionItemBySessionId, searchSessionItems } from "@/config/api";

export default async function Page() {

  const data = {
    hint: 'import an api handler from @/config/api and test the api integration to view response data.'
  };

  const users = await getAllUsers(1, 10);

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