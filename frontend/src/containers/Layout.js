import React, { Component } from "react";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { Sider, Header } from "../components/Layout";
import { connection, presentService, checkConnectivity } from "../services/Socket";
import { connect } from "react-redux";
import Aux from "../components/Hoc";

import "../assets/styles/index.scss";

// loads the Icon plugin
UIkit.use(Icons);

class Layout extends Component {
  componentDidMount = () => {
    this.props.connection(() => {
      this.props.presentService();
      setInterval(() => {
        this.props.checkConnectivity()
      }, 1500)
    });
  };

  render() {
    return (
      <Aux>
        <Sider />
        <div className="uk-flex uk-flex-column full-width">
          <Header />
          <main className="content">{this.props.children}</main>
        </div>
      </Aux>
    );
  }
}

export default connect(
  null,
  {
    connection,
    presentService,
    checkConnectivity
  }
)(Layout);
