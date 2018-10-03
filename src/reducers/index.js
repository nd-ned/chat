import { combineReducers } from "redux";
import user from "./user";
import contacts from "./contacts";
import activeUserId from "./activeUserId"
import messages from "./messages"
import typing from "./typing";
import userInteraction from "./userInteraction"


export default combineReducers({
  user,
  contacts,
  activeUserId,
  messages,
  typing,
  userInteraction
});