import React, { useState, useEffect } from 'react';
import { FaHome, FaHashtag, FaBell, FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <button className="lg:hidden p-4" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>
      <div className={`sidebar ${isOpen ? 'block' : 'hidden'} lg:block pl-4 p-4`}>
        <nav>
          <ul>
            <li className="flex items-center "><FaHome className='mr-1' /><a href="#">Home</a></li>
            <li className="flex items-center "><FaHashtag className='mr-1' /><a href="#">Explore</a></li>
            <li className="flex items-center "><FaBell className='mr-1' /><a href="#">Notifications</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
