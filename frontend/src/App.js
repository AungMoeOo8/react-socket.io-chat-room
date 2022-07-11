import "./App.css";
import { SocketProvider } from "./socketProvider";
import React from "react";
const Home = React.lazy(() => import("./home"));

function App() {
  return (
    <SocketProvider>
      <div className="App">
        <React.Suspense fallback={<p></p>}>
          <Home />
        </React.Suspense>
      </div>
    </SocketProvider>
  );
}

export default App;
