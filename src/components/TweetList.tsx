"use client";
import React, { useEffect, useState } from 'react';
import Tweet from './Tweet';
import { supabase } from '../lib/supabaseClient';

interface TweetType {
  id: string;
  content: string;
  user_id: string;
  users: { fullname: string; username: string; avatar_url: string };
}

const TweetList = () => {
  const [tweets, setTweets] = useState<TweetType[]>([]);

  useEffect(() => {
    const loadTweets = async () => {
      const { data, error } = await supabase
        .from('tweets')
        .select(`id, content, user_id, users!inner(fullname, username, avatar_url)`);

      if (error) {
        console.error('Error fetching tweets:', error);
      } else {
        const formattedData = data.map(tweet => ({
          ...tweet,
          users: tweet.users.length > 0 ? tweet.users[0] : { fullname: '', username: '', avatar_url: '' }
        }));
        setTweets(formattedData);
      }
    };

    loadTweets();
  }, []);

  return (
    <div className="tweet-list">
      {tweets.map(tweet => (
        <Tweet
          key={tweet.id}
          content={tweet.content}
          userId={tweet.user_id}
          fullname={tweet.users.fullname}
          username={tweet.users.username}
          avatarUrl={tweet.users.avatar_url}
        />
      ))}
    </div>
  );
};

export default TweetList;
