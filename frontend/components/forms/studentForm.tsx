import React, { useEffect, useState } from "react";
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Props {
  role: string;
}

const PresenterForm: React.FC<Props> = ({ role }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [users, setUsers] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [abstractId, setAbstractId] = useState<string>("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidAbstractId, setInvalidAbstractId] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkInStatus, setCheckInStatus] = useState<string | null>(null);

  const handleGoBack = () => {
    router.push('/check-in');
  };

  const validate = () => {
    if (name.trim() === '') {
      setInvalidName(true);
      setError("All fields are required");
    }

    if (email.trim() === '') {
      setInvalidEmail(true);
      setError("All fields are required");
    }

    if (abstractId.trim() === '') {
      setInvalidAbstractId(true);
      setError("All fields are required");
    }
  }

  const handleSubmit = async () => {
    // Basic form validation
    validate();

    // If all validations pass, proceed with form submission logic
    setError(null);

    // Handle form submission logic here
    try {
      if (email && email !== '' && name && name !== '' && abstractId && abstractId !== '') {
        const res = await fetch(`/api/users/search?q=${email}`);
        if (!res.ok) {
          throw new Error("Failed to search user");
        }
        const userData = await res.json();
        setUsers(userData);
        onOpen(); // Open the modal after fetching the data
      }
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };

  const onCheckIn = async () => {
    try {
      // Check if there are users to check in
      if (users.length === 0) {
        console.error("No user data to check in");
        setCheckInStatus(null);
        return;
      }

      const userId = users[0].id; // Assuming you only want to check in the first user

      // Send a PUT request to update the registration status
      const updateRes = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify({
          registered: true,
          registeredAt: new Date().toLocaleDateString()
        }),
      });

      if (!updateRes.ok) {
        throw new Error("Failed to update registration status");
      }

      // Fetch the updated user data
      const updatedUserData = await updateRes.json();

      // Set check-in status and close the modal after checking in
      setCheckInStatus("Successfully checked in!");

      // Close the modal after checking in
      onClose();
    } catch (error) {
      console.error("Error checking in user:", error);
    }
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="mt-8">
      <div className="mb-5 p-2 rounded-md text-3xl text-gray-900 font-semibold text-center bg-yellow-500">
        <h1>Student of Faculty of Science</h1>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Enter Your Details</h2>
      <Input
        label="Name"
        placeholder="Enter your name"
        className="mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onFocus={() => setInvalidName(false)}
        isInvalid={invalidName}
        isRequired={true}
        variant="bordered"
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        className="mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setInvalidEmail(false)}
        isInvalid={invalidEmail}
        isRequired={true}
        variant="bordered"
      />
      <Input
        label="Student Registration No"
        placeholder="S/XX/XXX"
        className="mb-4"
        value={abstractId}
        onChange={(e) => setAbstractId(e.target.value)}
        onFocus={() => setInvalidAbstractId(false)}
        isInvalid={invalidAbstractId}
        isRequired={true}
        variant="bordered"
      />

      <div className="flex justify-between">
        <Button
          className="bg-gray-800 text-lg font-semibold text-white px-4 py-2 rounded"
          onClick={handleGoBack}
        >
          Go Back
        </Button>
        <Button
          className="bg-blue-500 text-lg font-semibold text-white px-4 py-2 rounded"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
        <ModalHeader>Are you sure you want to check in? (make sure you physically sign at the front desk)</ModalHeader>
          <ModalBody>
            {
              users.length !== 0 ? users.map((user: any, index: number) => {
                return (
                  <div key={index} className="p-2 flex-col justify-center bg-zinc-800 rounded-md">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Abstract ID: {JSON.stringify(user.presentingSessionIds)
                    }</p>
                  </div>
                )
              }) : <div>No user found!</div>
            }
          </ModalBody>
          <ModalFooter>
            {checkInStatus === null && users.length !== 0 ? (
              <Button className="font-semibold" color="success" onPress={onCheckIn}>
                Check in
              </Button>
            ) : (
              <p>{checkInStatus}</p>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PresenterForm;
