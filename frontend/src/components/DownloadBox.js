import React from "react";
import path from "path";
import { connect } from "react-redux";
import { bytesToSize, getDate } from "../services/Common";
import {
  resumeDownload,
  pauseDownload,
  startDownload,
  removeDownload,
  transferFile
} from "../services/Socket";
import { Line } from "rc-progress";
import UIkit from "uikit";
import PauseSvg from "../assets/images/pause.svg";

const actionItem = (action, index) => (
  <span
    onClick={() =>
      action.active
        ? action.onClick()
        : UIkit.notification({
          status: "danger",
          pos: "top-center",
          message: window.tr("app.error.operationNotAllowed")
        })
    }
    uk-tooltip={`title: ${action.tooltip}`}
    key={index}
    style={{ backgroundImage: `url(${action.img})` }}
    uk-icon={`icon: ${action.icon};ratio: ${action.ratio}`}
    className="uk-icon-image"
  />
);

class DownloadBox extends React.Component {
  render() {
    const { data } = this.props;
    const gid = data.gid;

    const storages = this.props.storages.filter(i => i.isUSB);
    const status = data.status;
    const actions = [
      {
        tooltip: window.tr("app.action.resume"),
        active: status === "paused",
        icon: "play-circle",
        onClick: () => this.props.resumeDownload(gid)
      },
      {
        tooltip: window.tr("app.action.pause"),
        active: status === "active",
        img: PauseSvg,
        onClick: () => this.props.pauseDownload(gid)
      },
      {
        tooltip: window.tr("app.action.reDownload"),
        active: true,
        icon: "refresh",
        onClick: () => this.props.startDownload(data.files[0].uris[0].uri)
      },
      {
        tooltip: window.tr("app.action.fileTransfer"),
        active: status === "complete",
        icon: "social",
        onClick: () =>
          window.open(
            `http://${this.props.status.ip}:8000/download?name=${getName}`
          )
      },
      {
        tooltip: window.tr("app.action.move"),
        active: status === "complete",
        icon: "move",
        drop: true,
        // onClick: () => this.props.transferFile(getName, "/Volumes/FAMILY")
        onClick: () =>
          storages.length
            ? openModal(getName)
            : UIkit.notification({
              status: "danger",
              pos: "top-center",
              message: window.tr("app.error.storageNotFound")
            })
      },
      {
        tooltip: window.tr("app.action.delete"),
        active: true,
        icon: "trash",
        onClick: () => this.props.removeDownload(gid, getName)
      }
    ];

    const openModal = name => {
      window.localStorage.setItem("downloadName", name);
      UIkit.modal("#HardUseModal").show();
    };

    const calculPercent = (
      (data.completedLength / data.totalLength) *
      100
    ).toFixed(2);

    const remainingTime = () => {
      let seconds = parseInt(
        (data.totalLength - data.completedLength) / data.downloadSpeed
      );
      let m = parseInt(seconds / 60);
      let h = parseInt(m / 60);
      let s = seconds - parseInt(m * 60);
      m = m - parseInt(h * 60);
      if (!seconds) return "00:00:00";
      return `${h}:${m}:${s}`;
    };

    const getName = path.basename(data.files[0].path);

    return (
      <div className="DownloadBox">
        <div className="head">
          <span uk-icon="icon: album; ratio: 2" />
          <div>
            <h5>{getName}</h5>
            <span>{getDate()}</span>
          </div>
        </div>
        <div className="details">
          <span>{bytesToSize(data.downloadSpeed)} / s</span>
          <span>{calculPercent} %</span>
        </div>
        <Line
          style={{ margin: "0 1rem", padding: ".7rem 0" }}
          percent={calculPercent}
          strokeWidth="1"
          trailColor="#eee"
          strokeColor={
            data.status === "complete"
              ? "#4CAF50"
              : data.status === "paused"
                ? "#FFC107"
                : data.status === "active"
                  ? "#2196F3"
                  : "#F44336"
          }
        />
        <div className="details">
          <span>
            {bytesToSize(data.completedLength)} /{" "}
            {bytesToSize(data.totalLength)}
          </span>
          <span>{remainingTime()}</span>
        </div>
        <div className="actions">
          {actions.map((action, index) => actionItem(action, index))}
        </div>
      </div>
    );
  }
}

const _DownloadBox = connect(
  state => ({
    status: state.Socket.status,
    storages: state.Socket.storages
  }),
  {
    resumeDownload,
    pauseDownload,
    removeDownload,
    startDownload,
    transferFile
  }
)(DownloadBox);

export default _DownloadBox;
