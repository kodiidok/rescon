'use client'

import React from "react";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Props {
  role: string;
}

const StudentForm: React.FC<Props> = ({ role }: Props) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/check-in');
  };

  return (
    <div className="mt-8">
      <div className="mb-5 p-2 rounded-md text-3xl font-semibold text-center bg-purple-500">
        <h1>{role}</h1>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Enter Your Details</h2>
      <Input label="Name" placeholder="Enter your name" className="mb-4" />
      <Input
        label="University Email"
        type="email"
        placeholder="Enter your email"
        className="mb-4"
      />
      <Input
        label="Student Registration No."
        placeholder="Enter your Student Registration No."
        className="mb-4"
      />

      <div className="flex justify-between">
        <Button
          className="bg-gray-800 text-lg font-semibold text-white px-4 py-2 rounded"
          onClick={handleGoBack}
        >
          Go Back
        </Button>
        <Button
          className="bg-purple-500 text-lg font-semibold text-white px-4 py-2 rounded"
          onClick={() => {
            // Handle form submission logic here
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default StudentForm;
