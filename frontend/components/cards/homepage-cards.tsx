'use client'

import { Button } from "@nextui-org/button";
import styles from '@/styles/home.module.css';
import { useRouter } from "next/navigation";

interface Props {
  name: string;
  route: string;
}

function HomePageCard({ name, route }: Props) {
  const router = useRouter();

  return (
    <>
      <Button className="rounded-md font-semibold text-lg md:grid-cols-4 hover:bg-lime-500 hover:text-gray-900" onClick={() => router.push(route)}>{name}</Button>
    </>
  );
}

export default function HomePageCards() {
  const cards: Props[] = [{ name: 'Scan QR', route: '/scan-qr' }, { name: 'Program', route: '/program' }, { name: 'Sessions', route: '/sessions' }, { name: 'Search', route: '/search-sessions' }];

  return (
    <>
      <div className="grid gap-3 grid-cols-1">
        {
          cards?.map((item, index) => (
            <HomePageCard key={item.name} name={item.name} route={item.route} />
          ))
        }
      </div>
    </>
  );
}