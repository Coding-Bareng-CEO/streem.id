import React from 'react';
import { useAvatar } from '../context/AvatarContext';

const InputBox = () => {
  const { avatarUrl,username   } = useAvatar();
  console.log("avatarUrl", avatarUrl, username);
  return (
    <div className="input-box p-4 border-b flex items-center">
      {avatarUrl && <img src={avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />}
      <input type="text" placeholder="What's happening?" className="w-full p-2 border rounded" />
      <div className="flex justify-between mt-2">
        <div className="flex space-x-2">
          <button>📷</button>
          <button>📹</button>
          <button>😊</button>
          <button>📍</button>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Post</button>
      </div>
    </div>
  );
};

export default InputBox;
