import React from 'react';
import styles from './header.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // これがないとイベントが親要素に伝播し、handleLayoutClickが呼び出され、メニューが開いてもすぐ閉じてしまう
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`} onClick={handleMenuClick}>
        {isMenuOpen && <div className={styles.closeIcon}>&times;</div>}
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.menuIcon} onClick={handleMenuClick}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
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
  );
}

export default Header;
