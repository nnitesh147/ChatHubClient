"use client";
import { SignedIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import Empty from "../components/Empty.jsx";
import Chat from "../components/Chat/Chat.jsx";

import ChatList from "../components/Chatlist/ChatList.jsx";
import { redirect } from "next/navigation.js";

export default function Home() {
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) return;

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <SignedIn>
      <div className="flex flex-row w-screen h-screen max-h-screen max-w-full overflow-hidden border-t-2 border-t-black">
        <div className="w-[30%] border-r-black border-r-2 h-screen max-h-screen">
          <ChatList />
        </div>
        <div className="w-[70%]">
          {/* <Empty /> */}
          <Chat />
        </div>
      </div>
    </SignedIn>
  );
}
