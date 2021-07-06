import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Profile from "./Reducer/reducer";

const store = createStore(Profile, composeWithDevTools());
export default store;
