import React, { useState } from 'react';
import Header from '../header/header';

//Layoutのどこをクリックしても（ヘッダーコンポーネントを含む）、
//handleLayoutClickが実行され、isMenuOpenがfalseに設定され、メニューが閉じるようになります。
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
