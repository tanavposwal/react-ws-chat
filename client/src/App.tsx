import { useState } from "react";
import Chat from "../components/Chat";
import useWebSocket from "react-use-websocket";
import Allusers from "../components/Allusers";

function App() {
  const [log, setLog] = useState(false);
  const [ready, setReady] = useState(false);
  const [room, setRoom] = useState<any>();
  const [name, setName] = useState<any>();
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    "ws://localhost:3000",
    {
      onOpen: () => {
        console.log("WebSocket connection established.");
      },
    }
  );

  function login() {
    localStorage.setItem("name", name);
    setLog(true);
    sendJsonMessage({
      type: "join",
      payload: {
        roomId: room,
        username: localStorage.getItem("name"),
      },
    });
    setReady(true);
  }

  return (
    <>
      {log ? (
        <div className="flex justify-center items-center h-full gap-2">
          <div className="border-2 border-white/10 rounded-lg shadow-lg p-4 h-[90vh] w-60">
            <div className="flex items-center text-2xl justify-center font-bold mb-4">
              <span
                className={
                  "w-2 h-2 rounded-full animate-ping mr-3 " +
                  (ready ? "bg-green-600" : "bg-red-600")
                }
              ></span>
              <p className="opacity-50  italic">
                #{room}
              </p>
            </div>
            <Allusers />
          </div>
          <div className="bg-white/10 rounded-lg shadow-lg p-4 h-[90vh] w-96">
            <h1 className="flex text-2xl font-bold mb-4">
              Chat App{" "}
              <p className="ml-2 opacity-40 text-md">
                ({localStorage.getItem("name")})
              </p>
            </h1>
            <Chat send={sendJsonMessage} msg={lastJsonMessage} />
          </div>
        </div>
      ) : (
        <div className="p-10 flex items-center justify-center">
          <div className="w-96 bg-white/10 p-8 flex flex-col rounded-lg select-none">
            <h1 className="text-center text-xl font-extrabold mb-5">
              React + WS chat
            </h1>
            <p className="font-semibold">Enter Room ID</p>
            <input
              type="text"
              placeholder="room id..."
              value={room}
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              className="mb-2 bg-transparent px-3 py-2 border-b-2 border-stone-600 outline-none hover:border-stone-500 focus:border-stone-500 transition"
            />
            <p className="font-semibold">Enter Your name</p>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="mb-2 bg-transparent px-3 py-2 border-b-2 border-stone-600 outline-none hover:border-stone-500 focus:border-stone-500 transition"
            />

            <button
              onClick={login}
              className="bg-green-500 w-fit px-5 py-2 rounded-lg mt-3 hover:bg-green-600 shadow-lg transition font-bold text-black"
            >
              ENTER CHAT
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
