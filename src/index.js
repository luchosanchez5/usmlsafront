import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk  from "redux-thunk";
import { ToastContainer } from "react-toastify";
import UserReducer from "./store/user/reducers/UserReducer";
import VenueReducer from "./store/Venue/reducers/VenueReducer";
import PersonsReducer from "./store/person/reducers/PersonsReducer";
import TeamReducer from "./store/team/reducers/TeamReducer";
import TournamentReducer from "./store/tournament/reducers/TournamentReducer";
import './index.css'
const rootReducer = combineReducers({
  user: UserReducer,
  venue:VenueReducer,
  person:PersonsReducer,
  team:TeamReducer,
  tournament:TournamentReducer
 
});

const { persistStore, persistReducer } = require("redux-persist");

let devtools, store;
const isClient = typeof window !== "undefined";
if (isClient) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

  const storage = require("redux-persist/lib/storage").default;
  const persistConfig = {
    key: "grow-share",
    storage,
  };

  store = createStore(
    
    persistReducer(persistConfig, rootReducer),
    compose(applyMiddleware(thunk), devtools)
  );
  

  store.__PERSISTOR = persistStore(store);
} else {
  store = (rootReducer, compose(applyMiddleware(thunk)));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
  </React.StrictMode>
);
