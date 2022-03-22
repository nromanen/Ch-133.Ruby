import ReactDOM from "react-dom";
import React, { Suspense } from "react";
import CustomRoutes from "./components/custom-routes/custom-routes";
import LoggedContext from 'context'
import { createContext, useState, useContext, useMemo } from 'react';

export default function App() {
  const [logged, setLogged] = useState(false);
  
  const value = useMemo(
    () => ({ logged, setLogged }),
    [logged]
  );

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
