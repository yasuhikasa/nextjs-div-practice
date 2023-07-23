import React from 'react';
import Header from '../header/header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      {/* 他の共通のレイアウトコンポーネントをここに追加する場合はここに記述 */}
    </div>
  );
};

export default Layout;