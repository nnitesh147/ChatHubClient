import GeminiAiMessageBar from "./GeminiAiMessageBar";
import GeminiAiHeader from "./GeminiAiHeader";
import GeminiAiContainer from "./GeminiAiContainer";
import { createContext, useState } from "react";

export const GeminiContext = createContext({});

const GeminiChatComponent = () => {
  const [geminiMessages, setgeminiMessages] = useState([]);

  return (
    <GeminiContext.Provider value={{ geminiMessages, setgeminiMessages }}>
      <div className="border-conversation-border border-1 w-full bg-conversation-panel-background flex flex-col h-[100vh]">
        <GeminiAiHeader />
        <GeminiAiContainer />
        <GeminiAiMessageBar />
      </div>
    </GeminiContext.Provider>
  );
};

export default GeminiChatComponent;
