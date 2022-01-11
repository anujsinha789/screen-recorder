import ReactDOM from "react-dom";

import App from "./App";
import { LogProvider } from "./context/LogContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <LogProvider>
    <App />
  </LogProvider>,
  rootElement
);
