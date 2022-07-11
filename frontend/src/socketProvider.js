import { useState, createContext } from "react";
import { io } from "socket.io-client";

const socketContext = createContext();

function SocketProvider({ children }) {
  const [socket, setSocket] = useState();

  const openConnection = (credential) => {
    setSocket(
      io("http://localhost:4000/", {
        query: {
          user: credential,
        },
      })
    );
  };

  const closeConnection = () => {
    socket.disconnect();
    setSocket();
  };

  return (
    <socketContext.Provider value={{ socket, openConnection, closeConnection }}>
      {children}
    </socketContext.Provider>
  );
}

export { SocketProvider, socketContext };
