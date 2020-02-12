import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./components/store";
import { startAddUser } from "./components/views/GetStarted/redux/action";
const store = configureStore();

if (localStorage.getItem("userAuthToken")) {
  store.dispatch(startAddUser());
}
const jsx = (
  <BrowserRouter>
    <Provider store={store}>
      <App token={localStorage.getItem("userAuthToken")}/>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(jsx, document.getElementById("root"));
