import { createStore } from "redux";
import rootReducers from "./reducers/reducers";

const store = createStore(rootReducers)
export default store;