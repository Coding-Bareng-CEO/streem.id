import Image from "next/image";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TweetList from '../components/TweetList';
import Footer from '../components/Footer';
import InputBox from '../components/InputBox';

export default function Home() {
  return (
    <div className="app-container flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="w-1/4 p-4" />
        <div className="w-3/4 p-4">
          <InputBox />
          <TweetList />
        </div>
      </div>
      <Footer />
    </div>
  );
}
