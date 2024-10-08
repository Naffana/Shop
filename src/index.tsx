import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as BR } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Components/Store/Store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BR>
      <App />
    </BR>
  </Provider>
);
