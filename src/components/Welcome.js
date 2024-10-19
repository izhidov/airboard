import React, { useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import ChatBox from "./ChatBox";

const Welcome = () => {
  const [showChatbox, setShowChatbox] = useState(false); // State to track visibility

  const handleChatClick = () => {
    setShowChatbox(!showChatbox); // Update state to show Chatbox
  };

  return (
    <main className="welcome">
      <h2>Welcome to React Chat.</h2>
      <img src="/logo512.png" alt="ReactJs logo" width={50} height={50} />
      <p>Click here to start chatting with your fellow coders</p>
      <button className="chat" onClick={handleChatClick}>
        {showChatbox ? "End Chat" : "Let's Chat!"}
      </button>
      {/* Conditionally render Chatbox based on state */}
      {showChatbox && <ChatBox />}
    </main>
  );
};

export default Welcome;
