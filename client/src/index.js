import ReactDOM from "react-dom";
import CustomRoutes from "./components/custom-routes/custom-routes";
import React, { Component }  from 'react';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


export default function App() {
  return (
    <CustomRoutes/>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
