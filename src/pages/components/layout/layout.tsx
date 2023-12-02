import React, { useState } from 'react';
import Header from '../header/header';
import { NextPage } from 'next';

//Layoutのどこをクリックしても（ヘッダーコンポーネントを含む）、
//handleLayoutClickが実行され、isMenuOpenがfalseに設定され、メニューが閉じるようになります。
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLayoutClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div onClick={handleLayoutClick}>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
