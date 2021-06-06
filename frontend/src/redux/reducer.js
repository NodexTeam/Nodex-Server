import { combineReducers } from "redux";
import Socket from "../services/Socket";
import GeneralModule from "../containers/Module";

export default combineReducers({
  Socket: Socket,
  General: GeneralModule
});
