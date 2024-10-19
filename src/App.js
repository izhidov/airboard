import { auth } from "./firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";

function App() {
  const [user] = useAuthState(auth);
  console.log("in app.js", user);

  // end point for
  const [response, setResponse] = useState("");
  const callFunction = async () => {
    try {
      const res = await fetch(
        "https://region-project_id.cloudfunctions.net/helloWorld",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.text(); // or use .json() if you're expecting a JSON response
      setResponse(data);
    } catch (error) {
      console.error("Error calling function:", error);
    }
  };
  return (
    <>
      <div>
        <button onClick={callFunction}>Call Cloud Function</button>
        <p>Response: {response}</p>
      </div>

      <div className="App">
        <NavBar />
        {!user ? <Welcome /> : <ChatBox />}
      </div>
    </>
  );
}
export default App;
