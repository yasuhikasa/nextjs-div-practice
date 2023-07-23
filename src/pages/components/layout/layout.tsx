import React, { useState } from 'react';
import Header from '../header/header';

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
