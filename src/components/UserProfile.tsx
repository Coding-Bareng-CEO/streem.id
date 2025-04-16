import React from 'react';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <img src="/default-avatar.png" alt="User Avatar" className="avatar" />
      <div className="user-details">
        <span className="username">User Name</span>
        <span className="handle">@username</span>
      </div>
    </div>
  );
};

export default UserProfile;
