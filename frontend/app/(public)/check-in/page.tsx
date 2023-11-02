'use client'

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleButtonClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="mt-36 flex flex-col justify-center items-center px-10">
      <h1 className="text-4xl font-semibold mb-6">Choose Your Role</h1>
      <div className="w-96 flex flex-col gap-4 font-semibold p-10">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleButtonClick('/check-in/presenter')}>
          Presenter
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleButtonClick('/check-in/paid-user')}>
          Paid User
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded" onClick={() => handleButtonClick('/check-in/student')}>
          Student
        </button>
      </div>
    </div>
  );
}