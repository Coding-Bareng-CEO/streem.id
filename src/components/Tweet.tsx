import React from 'react';

interface TweetProps {
  content: string;
  userId: string;
  fullname: string;
  username: string;
  avatarUrl: string;
}

const Tweet: React.FC<TweetProps> = ({ content, userId, fullname, username, avatarUrl }) => {
  return (
    <div className="tweet p-4 border-b">
      <div className="user-info flex items-center mb-2">
        <img src={avatarUrl} alt="User Avatar" className="avatar w-10 h-10 rounded-full mr-2" />
        <div className="user-details">
          <span className="username font-bold">{fullname}</span>
          <span className="handle text-gray-500 ml-2">@{username}</span>
        </div>
      </div>
      <div className="content mb-2">
        <p>{content}</p>
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
