/* 
eslint-disable @typescript-eslint/no-explicit-any 
*/


import { useState, useEffect } from "react";
import EmojiBtn from "../components/emojiBtn/EmojiBtn";
import { useDarkMode } from "../context/Dark-mode";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function ChattingWidget() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const { darkMode } = useDarkMode();
  const socketUrl = "ws://localhost:3030";

  const socket = new WebSocket('ws://localhost:3030');

  // 연결이 열릴 때
  socket.addEventListener('open', () => {
    socket.send('Hello Server!');
  });

  // 서버로부터 메시지를 받았을 때
  socket.addEventListener('message', (event) => {
      console.log('Message from server: ', event.data);
  });

  // 연결이 닫혔을 때
  socket.addEventListener('close', (event) => {
      console.log('Server Connection Closed', event);
  });

  // 에러가 발생했을 때
  socket.addEventListener('error', (event) => {
      console.error('WebSocket Error: ', event);
  });
  
  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(socketUrl);

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      sendJsonMessage({ event: "chat", message: inputText });
      setInputText("");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setInputText((prevText) => prevText + emoji);
  };

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log("WebSocket 연결이 열렸습니다.");
    } else if (readyState === ReadyState.CLOSED) {
      console.log("WebSocket 연결이 닫혔습니다.");
    }
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage) {
      const message = lastJsonMessage;
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, { text: message }]);
    }
  }, [lastJsonMessage]);

  return (
    <section
      className={`relative flex flex-col my-[0] mx-auto w-[100%] h-[800px] group border-1 border-solid z-0 border-slate-300 rounded-lg shadow-md ${
        darkMode ? "shadow-white" : "shadow-slate-500"
      }`}
    >
      <div className="bg-slate-60 h-[90%] bottom-0 overflow-scroll overflow-x-hidden mb-[5%]">
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <div className="absolute bottom-0 h-[60px] group cursor-pointer flex-1 flex items-center justify-center w-full rounded-lg border-2 border-solid border-grey-200 transition-opacity duration-500 group-hover:border-blue-300 group-focus-within:border-blue-300 opacity-100">
        <input
          placeholder="할 얘기가 있으신가요?"
          className="mx-[2%] w-[85%] h-[90%] text-lg placeholder:text-slate-300 outline-none bg-transparent"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="z-410 flex-1 mx-[1%] h-[90%]">
          <EmojiBtn onEmojiSelect={handleEmojiSelect} />
        </div>
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </section>
  );
}
