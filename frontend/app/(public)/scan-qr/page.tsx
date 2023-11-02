'use client'

import Banner from "@/components/common/banner/banner";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
// import { useMediaQuery } from 'react-responsive';
import { QrReader } from 'react-qr-reader';
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [qrCodeData, setQrCodeData] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  const handleButtonClick = (route: string) => {
    router.push(route);
  };

  const handleScan = (data: string | null) => {
    if (data) {
      const expectedURL = 'https://qrco.de/beVPaC';

      // Check if the scanned QR code data matches the expected URL
      if (data === expectedURL) {
        router.push('/check-in');
      } else {
        console.log('BAD URL');
      }
    }
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Initial check on mount
    handleResize();

    // Attach event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="px-10">
      {/* <Banner /> */}
      <div className="flex flex-col md:flex-row gap-5 w-full justify-center">
        {isMobile && (
          // Show QR code scanner for mobile
          <QrReader
            onResult={(result: any, error: any) => {
              if (result) {
                handleScan(result.text);
              }

              if (error) {
                handleError(error);
              }
            }}
            className="w-full"
            constraints={{
              facingMode: 'environment'
            }}
          />
        ) 
        // : (
        //   // Show image for larger screens
        //   <Image src="QR/regQR.svg" width={400} height={400} />
        // )
        }
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-semibold my-4">Registration</h1>
          <p className="text-lg mb-2">
            Scan the QR code at the <span className="font-bold">registration desk</span>
          </p>
          <p className="text-sm text-gray-600">
            Make sure to give permisssion to use the camera from the device to complete the registration process.
          </p>
          {/* <button className="bg-green-500 font-semibold text-gray-900 px-4 py-2 rounded mt-5" onClick={() => handleButtonClick('/check-in')}>
            Next
          </button> */}
        </div>
      </div>
    </div >
  );
}