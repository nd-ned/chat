import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from "../reducers/";
import logger from 'redux-logger';

console.warn("%c🐘", "color: red; font-size: 34px;", "\n ./src/store/ \n Line 7: don't forget to remove the state logger" )

const middleWare = applyMiddleware(thunk, logger)
const store = createStore(reducer, middleWare)

export default store;