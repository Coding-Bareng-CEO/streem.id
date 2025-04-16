import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="header flex justify-between items-center p-4 border-b">
      <Image src="/streem.png?v=1" alt="Logo" width={40} height={40} className="mr-2" />
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-blue-500">For you</a></li>
          <li><a href="#" className="text-gray-500">Following</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
