'use client'

import { Image } from "@nextui-org/react";
import styles from '@/styles/home.module.css';

export default function Banner() {
  return (
    <>
      <div className={[styles['banner-container'], styles['center-all']].join(' ')}>
        <Image width={450} src="rescon logo.JPG" alt="rescon 23 logo" />
      </div>
      <div className={[styles['image-container'], styles['center-all']].join(' ')}>
        <Image className={styles['image']} src="kotiya-banner.png" alt="kotiya" />
      </div>
    </>
  );
}