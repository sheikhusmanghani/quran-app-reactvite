import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      {/* 🌙 Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6">
          <h1 className="text-3xl font-bold tracking-wide flex items-center">
            <BookOpenIcon className="h-8 w-8 mr-2" />
            <Link to={"/"}> Al-Quran</Link>
          </h1>
          {/* <p className="text-lg ">Contact</p> */}
          <ChatBubbleBottomCenterTextIcon className="h-7 " />
        </div>
      </header>
    </>

    //     <header className="bg-primary text-secondary py-4 shadow-lg">
    //       <div className="container mx-auto px-4">
    //         <Link to="/" className="flex items-center gap-2">
    //           <h1 className="text-2xl font-bold">Recite Quran </h1>
    //         </Link>
    //       </div>
    //     </header>
  );
}
