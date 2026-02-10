import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Header() {
  useEffect(() => {
    const isFirstVisit = localStorage.getItem("visited");
    // checking
    if (!isFirstVisit) {
      toast(
        <div className="text-center ">
          <p> 💥 Welcome To My Website 💥 </p>
          <p> 💥 Created by Hafiz Usman Ghani 💥 </p>
        </div>
      );
      // setting
      localStorage.setItem("visited", "true");
    }
  }, []);

  return (
    <>
      {/* 🌙 Header */}
      <header className="mainColor text-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6">
          <h1 className="text-3xl font-bold tracking-wide flex items-center">
            <BookOpenIcon className="h-8 w-8 mr-2" />
            <Link to={"/"} className="">
              Recite Quran
            </Link>
          </h1>
          {/* <p className="text-lg ">Contact</p> */}
          <ChatBubbleBottomCenterTextIcon
            className="h-7 "
            onClick={() => {
              const msg = prompt("Please write your message here. It will be delivered to Usman Ghani.");
            }}
          />
        </div>
      </header>
    </>
  );
}
