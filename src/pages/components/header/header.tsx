import React from 'react';
import styles from '../../../styles/components/header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: NextPage<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const router = useRouter();

  const getContentName = () => {
    switch (router.pathname) {
      case "/":
        return "Home";
      case "/about":
        return "About";
      case "/users/createUser":
        return "ユーザー登録";
      case "/users":
        return "ユーザー一覧";
      case "/hookFormExample/createUser":
        return "HookForm例";
      case "/search/users":
        return "ユーザー検索";
      case "/csv/create":
        return "csv作成";
      case "/csv/export":
        return "csvエクスポート";
      default:
        return "Unknown Page";
    }
  }

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
          <li>
            <Link href="/users/createUser">ユーザー登録</Link>
          </li>
          <li>
            <Link href="/users">ユーザー一覧</Link>
          </li>
          <li>
            <Link href="/search/users">ユーザー検索</Link>
          </li>
          <li>
            <Link href="/hookFormExample/createUser">HookForm例</Link>
          </li>
          <li>
            <Link href="/csv/create">csv作成</Link>
          </li>
          <li>
            <Link href="/csv/export">csvエクスポート</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.menuIcon} onClick={handleMenuClick}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <div>
        <Image src="/kuma_01.png" alt="Logo" width={100} height={40} priority />
      </div>
      <div>
        {getContentName()}
      </div>
      <div>
        ユーザー名
      </div>
    </header>
  );
}

export default Header;
