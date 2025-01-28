import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StaffProvider } from "./context/StaffContext"; // Import StaffProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StaffProvider>
      <App />
    </StaffProvider>
  </React.StrictMode>
);
