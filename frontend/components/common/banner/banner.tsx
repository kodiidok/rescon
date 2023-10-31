'use client'

import { Image } from "@nextui-org/react";
import styles from '@/styles/home.module.css';

export default function Banner() {
  return (
    <>
      <div className={[styles['banner-container'], styles['center-all']].join(' ')}>
        <div className={[styles['banner-lg']].join(' ')}>
          <div className={[styles['flex-row'], styles['flex-start']].join(' ')}>
            <Image width={90} src="uop.png" alt="uop logo" />
            <div className={[styles['banner-font']].join(' ')} >
              <h1>Postgraduate Institute of Science</h1>
              <h4>University of Peradeniya</h4>
              <h5>Sri Lanka</h5>
            </div>

          </div>
          <Image className={[styles['flex-end']].join(' ')} 
          width={450} src="rescon logo.JPG" alt="rescon 23 logo" />
        </div>
        <div className={[styles['banner-sm']]
        .join(' ')}>
          <div className={[styles['flex-row'], styles['flex-start']].join(' ')}>
            <Image width={90} src="uop.png" alt="uop logo" />
            <Image className={[styles['flex-end']].join(' ')} width={450} src="rescon logo.JPG" alt="rescon 23 logo" />
          </div>
          <div className={[styles['banner-font']].join(' ')} >
            <h1>Postgraduate Institute of Science</h1>
            <h4>University of Peradeniya, Sri Lanka</h4>
          </div>
        </div>
      </div>
      <div className={[styles['image-container'], styles['center-all']].join(' ')}>
        <Image className={styles['image']} src="kotiya-banner.png" alt="kotiya" />
      </div>
    </>
  );
}