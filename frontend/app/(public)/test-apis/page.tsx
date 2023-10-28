import { getSessionItemBySessionId, searchSessionItems } from "@/config/api";

export default async function Page() {

  // const data = {
  //   hint: 'import an api handler from @/config/api and test the api integration to view response data.'
  // };

  const data = await getSessionItemBySessionId('LS1');

  return (
    <div>
      we test api's here!
      <div>
        {JSON.stringify(data)}
      </div>
    </div>
  );
}