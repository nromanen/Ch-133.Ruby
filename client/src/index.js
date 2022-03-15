import React from 'react';
import ReactDOM from "react-dom";
import CustomRoutes from "./components/custom-routes/custom-routes";

export default function App() {
  return (
    <CustomRoutes/>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
