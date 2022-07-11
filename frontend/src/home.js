import { useState, useEffect, useRef, useContext } from "react";
import { socketContext } from "./socketProvider";
import Auth from "./auth";
import Chat from "./chat";

function Home() {
  const { socket } = useContext(socketContext);
  return <div className="home">{!socket ? <Auth /> : <Chat />}</div>;
}

export default Home;
