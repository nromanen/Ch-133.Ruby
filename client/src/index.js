import ReactDOM from "react-dom";
import CustomRoutes from "./components/custom-routes/custom-routes";
import React, { Component, Suspense }  from 'react';
import LoggedContext from './context'
import { createContext, useState, useContext, useMemo } from 'react';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function App() {
  const [logged, setLogged] = useState(false);

  const value = { logged, setLogged };

  return (
    <LoggedContext.Provider value={value}>
      <CustomRoutes/>
    </LoggedContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
