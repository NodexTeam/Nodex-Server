import "./bootstrap";
import React, { Component } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import conf from "./config";
import { connection } from "./services/Socket";
import Dashboard from "./containers/Dashboard";
import Downloading from "./containers/Downloading";
import Wait from "./containers/Wait";
import Downloaded from "./containers/Downloaded";
import All from "./containers/All";
// import Login from "./containers/Login";
import store from "./redux/store";
import PrivateRoute from "./components/PrivateRoute";

const { routes, theme } = conf;

class App extends Component {
  componentDidMount = () => {
    connection();
  }
  render() {
    return (
      <Provider store={store}>
        <div className={`${theme.mode}`}>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to={routes.dashboard} />}
              />
              <PrivateRoute path={routes.dashboard} component={Dashboard} />
              <PrivateRoute path={routes.downloading} component={Downloading} />
              <PrivateRoute path={routes.all} component={All} />
              <PrivateRoute path={routes.downloaded} component={Downloaded} />
              <PrivateRoute path={routes.wait} component={Wait} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
