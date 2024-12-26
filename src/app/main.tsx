import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.scss";
import App from "./App";
import StoreProvider from "./providers/StoreProvider";
import BrowserRouterProvider from "./providers/BrowserRouterProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouterProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouterProvider>
  </StrictMode>
);
