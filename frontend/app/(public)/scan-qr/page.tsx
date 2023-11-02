'use client'

import Banner from "@/components/common/banner/banner";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleButtonClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="px-10">
      <Banner />
      <div className="flex flex-col md:flex-row gap-5 w-full justify-center">
        <Image src="QR/regQR.svg" width={400} height={400} />
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-semibold my-4">Registration</h1>
          <p className="text-lg mb-2">
            Scan the QR code to access the registration portal.
          </p>
          <p className="text-sm text-gray-600">
            Make sure to have your details ready for a smooth registration process.
          </p>
          <button className="bg-green-500 font-semibold text-gray-900 px-4 py-2 rounded mt-5" onClick={() => handleButtonClick('/check-in')}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}