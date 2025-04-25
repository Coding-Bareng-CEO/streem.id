"use client";

import Image from "next/image";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TweetList from '../components/TweetList';
import Footer from '../components/Footer';
import InputBox from '../components/InputBox';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsSignedIn(!!user);
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSignedIn(!!session?.user);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="app-container flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="w-full p-4 mx-auto">
          {isSignedIn ? (
            <InputBox />
          ) : (
            <p>
              Please <a href="/signup" style={{ color: 'blue' }}>sign up</a> or <a href="/signin" style={{ color: 'blue' }}>sign in</a> to post a message.
            </p>
          )}
          <TweetList />
        </div>
      </div>
      <Footer />
    </div>
  );
}
