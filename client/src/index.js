import ReactDOM from "react-dom";
import React, { Suspense } from "react";
import CustomRoutes from "./components/custom-routes/custom-routes";

export default function App() {
  return (
    <CustomRoutes/>
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
