import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; /* eslint-disable-line */
import thunkMiddleware from "redux-thunk";
import reducers from "./reducer";

const store =
  process.env.NODE_ENV === "development"
    ? createStore(
        reducers,
        composeWithDevTools(
          applyMiddleware(thunkMiddleware.withExtraArgument(window.api))
        )
      )
    : createStore(
        reducers,
        applyMiddleware(thunkMiddleware.withExtraArgument(window.api))
      );

export default store;
