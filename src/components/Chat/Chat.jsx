import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";
import ChatHeader from "./ChatHeader";

function Chat() {
  return (
    <div className="border-conversation-border border-1 w-full bg-conversation-panel-background flex flex-col h-[100vh]">
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
}

export default Chat;
