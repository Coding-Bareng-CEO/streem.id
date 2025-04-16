import React from 'react';

const Tweet = () => {
  return (
    <div className="tweet p-4 border-b">
      <div className="user-info flex items-center mb-2">
        <img src="/default-avatar.png" alt="User Avatar" className="avatar w-10 h-10 rounded-full mr-2" />
        <div className="user-details">
          <span className="username font-bold">User Name</span>
          <span className="handle text-gray-500 ml-2">@username</span>
        </div>
      </div>
      <div className="content mb-2">
        <p>This is an example tweet content.</p>
        <img src="/example-image.jpg" alt="Tweet Image" className="w-full mt-2 rounded" />
      </div>
      <div className="interactions flex justify-between text-gray-500">
        <span>919 Likes</span>
        <span>3.7K Retweets</span>
        <span>13K Comments</span>
      </div>
    </div>
  );
};

export default Tweet;
