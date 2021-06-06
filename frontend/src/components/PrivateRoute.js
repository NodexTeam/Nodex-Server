import React from "react";
import Layout from "../containers/Layout";
import Modal from "./Modal";
import HardUseModal from "./HardUseModal";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

const PrivateRoute = ({
  component: Component,
  authorized,
  spinning,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authorized ? (
        <LoadingOverlay
          active={spinning}
          spinner
          text={window.tr("app.loading")}
        >
          <Layout>
            <Modal />
            <HardUseModal />
            <Component {...props} />
          </Layout>
        </LoadingOverlay>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default connect(
  state => ({
    // authorized: ,
    spinning: state.Socket.spinning,
    authorized: true
  }),
  null
)(PrivateRoute);
