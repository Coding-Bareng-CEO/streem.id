import React from 'react';
import { FaHome, FaHashtag, FaBell } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar pl-4 pt-1 w-1/4 p-4">
      <nav>
        <ul>
          <li className="flex items-center gap-2"><FaHome /><a href="#">Home</a></li>
          <li className="flex items-center gap-2"><FaHashtag /><a href="#">Explore</a></li>
          <li className="flex items-center gap-2"><FaBell /><a href="#">Notifications</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
