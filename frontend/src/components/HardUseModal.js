import React from "react";
import { connect } from "react-redux";
import { transferFile } from "../services/Socket";
import { bytesToSize } from "../services/Common";
import UIkit from "uikit";

class HardUseModal extends React.Component {
  trans = (name, path) => {
    UIkit.modal("#HardUseModal").hide();
    this.props.transferFile(window.localStorage.getItem("downloadName"), path);
  };

  render = () => {
    return (
      <div id="HardUseModal" className="uk-flex-top" uk-modal="uk-modal">
        <div className="uk-modal-dialog">
          <button
            className="uk-modal-close-default"
            type="button"
            uk-close="uk-close"
          />
          <div className="uk-modal-header">
            <h2 className="uk-modal-title uk-text-center">
              {window.tr("app.modal.selectUsb")}
            </h2>
          </div>
          <div className="uk-modal-body">
            <ul className="uk-list uk-list-divider">
              {this.props.storages.map(
                (i, index) =>
                  i.isUSB && (
                    <li
                      key={index}
                      onClick={() => this.trans("", i.mountpoints[0].path)}
                    >
                      {`${i.mountpoints[0].label} (${bytesToSize(
                        i.size
                      )}/${bytesToSize(i.size - i.free)})`}
                    </li>
                  )
              )}
            </ul>
          </div>
          <div className="uk-modal-footer uk-text-center">
            <button
              className="uk-button uk-button-default uk-modal-close"
              type="button"
            >
              {window.tr("app.modal.cancel")}
            </button>
          </div>
        </div>
      </div>
    );
  };
}

export default connect(
  state => ({
    storages: state.Socket.storages
  }),
  {
    transferFile
  }
)(HardUseModal);
