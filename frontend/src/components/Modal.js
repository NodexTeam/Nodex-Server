import React from "react";
import Aux from "../components/Hoc";
import { connect } from "react-redux";
import { startDownload } from "../services/Socket";
import UIkit from 'uikit'

class Modal extends React.PureComponent {
  state = {
    link: ""
  };

  handleCancel = () => {
    this.setState({
      link: ""
    });
  };

  handleOk = () => {
    this.props.startDownload(this.state.link);
    this.setState({ link: "" });
  };

  handleChange = e => {
    this.setState({
      link: e.target.value
    });
  };

  notifyStatus = () => {
    if (this.props.connectivity) {
      UIkit.notification({
        message: 'Your Connection is Ok',
        pos: 'top-center',
        timeout: 5000
      });
    } else {
      UIkit.notification({
        message: 'You Are Not Connected',
        pos: 'top-center',
        timeout: 5000
      });
    }
  }

  render = () => {
    return (
      <Aux>
        <div
          id="modal-ndownload"
          uk-modal="true"
          className="uk-flex-top center-text"
        >
          <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <button
              className="uk-modal-close-default"
              type="button"
              uk-close="true"
            />
            <h3 className="center-text">
              {window.tr("app.modal.newDownload")}
            </h3>
            <div className="uk-margin">
              <textarea
                value={this.state.link}
                onChange={this.handleChange}
                className="uk-textarea"
                rows="5"
                placeholder={window.tr("app.modal.enterLink")}
              />
              <div>
                <button
                  className="uk-button uk-button-default uk-modal-close"
                  type="button"
                  onClick={this.handleCancel}
                >
                  {window.tr("app.modal.cancel")}
                </button>
                <button
                  className="uk-button uk-button-primary uk-modal-close"
                  style={{ margin: "0.5rem" }}
                  type="button"
                  onClick={this.handleOk}
                >
                  {window.tr("app.modal.ok")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="uk-button uk-button-primary fab"
          uk-toggle="target: #modal-ndownload"
        >
          <span uk-icon="plus" />
        </button>
        {this.props.connectivity || (
          <button
            style={{ left: "1rem !important", right: "unset !importnant" }}
            className="uk-button fab conn-fab"
            onClick={() => this.notifyStatus()}
          >
            <div uk-spinner="ratio: 1"></div>
          </button>
        )}
      </Aux>
    );
  };
}

export default connect(
  state => ({
    connectivity: state.Socket.connectivity
  }),
  {
    startDownload
  }
)(Modal);
