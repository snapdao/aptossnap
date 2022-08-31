import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import "uno.css";
import "virtual:unocss-devtools";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
