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
      <Button className={[styles['homepage-btn']].join(' ')} onClick={() => router.push(route)}>{name}</Button>
    </>
  );
}

export default function HomePageCards() {
  const cards: Props[] = [{ name: 'Check In', route: '/check-in' }, { name: 'Program', route: '/program' }, { name: 'Sessions', route: '/sessions' }, { name: 'Search', route: '/search-sessions' }];

  return (
    <>
      <div className={[styles['homepage-card-grid']].join(' ')}>
        {
          cards?.map((item, index) => (
            <HomePageCard key={item.name} name={item.name} route={item.route} />
          ))
        }
      </div>
    </>
  );
}