import React from 'react';
import styles from './header.module.css';
import Image from 'next/image';


const Header: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <div>
          <Image src="/kuma_01.png" alt="Logo" width={100} height={40} />
        </div>
          <div>
            コンテンツ名
          </div>
        
        <div>
          ユーザー名
        </div>

      </header>
    </>
  );
}

export default Header;