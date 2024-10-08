import { StateContext } from "../Main.jsx";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useContext } from "react";
import MessageStatus from "../common/MessageStatus";
import { calculateTime } from "@/utils/CalculateTime";

function ImageMessage({ message }) {
  const { currentChatUserMessages, currentChatUser } = useContext(StateContext);
  const { userId } = useAuth();

  return (
    <div
      className={`p-1 rounded-lg ${
        message.senderId == currentChatUser?.user_id
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    >
      <div className="relative">
        <Image
          src={message?.messageContent}
          alt="asset"
          className="rounded-lg"
          height={300}
          width={300}
        />
        <div className="absolute bottom-1 right-1 flex items-end gap-1">
          <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
            {calculateTime(message?.createdAt)}
          </span>
          <span className="text-bubble-meta">
            {message.senderId === userId && (
              <MessageStatus messageStatus={message?.messageStatus} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImageMessage;
