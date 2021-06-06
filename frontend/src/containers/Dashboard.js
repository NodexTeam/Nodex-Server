import React, { Component } from "react";
import { connect } from "react-redux";
import { bytesToSize } from "../services/Common";
import CountBox from "../components/CountBox";
import StorageBox from "../components/StorageBox";
import Aux from "../components/Hoc";
import NotFound from "../components/NotFound"
// import { changeDlDir } from "./services/Socket";

class Dashboard extends Component {
  render = () => {
    const {
      downloadSpeed,
      numActive,
      numStopped,
      numWaiting
    } = this.props.globalStat;

    const { storages } = this.props;
    const CountersBox = [
      {
        name: window.tr("app.page.dashboard.downloadSpeed"),
        icon: "download",
        value: downloadSpeed ? bytesToSize(downloadSpeed) : 0
      },
      {
        name: window.tr("app.page.dashboard.numActive"),
        icon: "database",
        value: numActive || 0
      },
      {
        name: window.tr("app.page.dashboard.numStopped"),
        icon: "cloud-download",
        value: numStopped || 0
      },
      {
        name: window.tr("app.page.dashboard.numWaiting"),
        icon: "future",
        value: numWaiting || 0
      }
    ];

    return (
      <Aux>

        {String(this.props.connectivity)}
        <h3 className="headTitle">
          {window.tr("app.page.dashboard.information")}
        </h3>
        <div className="uk-grid uk-grid-small" uk-grid="masonry: true">
          {CountersBox.map((item, index) => (
            <div
              className="uk-width-1-4@m uk-width-1-3@s uk-width-1-2"
              key={index}
            >
              <CountBox name={item.name} icon={item.icon} value={item.value} />
            </div>
          ))}
        </div>
        <h3 className="headTitle" style={{ margin: "2rem" }}>
          {window.tr("app.page.dashboard.storages")}
        </h3>
        <div className="uk-grid uk-grid-small" uk-grid="masonry: true">
          {storages.length === 0 && <NotFound text={window.tr("app.page.dashboard.storagesNotFound")} style={{
            position: "relative",
            top: "5rem"
          }} />}
          {storages.map((item, index) => (
            <div
              className="uk-width-1-3@m uk-width-1-3@s uk-width-1-2"
              key={index}
            >
              <StorageBox data={item} usb={item.isUSB} />
            </div>
          ))}
        </div>
      </Aux>
    );
  };
}

export default connect(
  state => ({
    globalStat: state.Socket.globalStat,
    storages: state.Socket.storages,
    connectivity: state.Socket.connectivity
  }),
  {
    // changeDlDir
  }
)(Dashboard);
