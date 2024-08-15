import React from "react";
import { logo } from "@/context/constants";
import Image from "next/image";

function Empty() {
  return (
    <div className="border-conversation-border border-1 w-full bg-panel-header-background flex flex-col h-[100vh] border-b-4 border-b-icon-green items-center justify-center gap-4">
      <Image
        src={logo}
        alt=""
        height={300}
        width={300}
        className="rounded-full"
      />
      <span className="text-7xl mt-4">ChatHub</span>
    </div>
  );
}

export default Empty;
