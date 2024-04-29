import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { rootReducer } from "./reducer/rootReducer";

const middleWares = [logger, thunk];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// rootReducers, inititaldata, middlwares
const store = createStore(rootReducer, {}, composedEnhancers);

export default store;
