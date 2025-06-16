import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { suppressReactWarnings } from "./utils/suppressWarnings";

// Suppress known warnings from third-party libraries
suppressReactWarnings();

createRoot(document.getElementById("root")!).render(<App />);
