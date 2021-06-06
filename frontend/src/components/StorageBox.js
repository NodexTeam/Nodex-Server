import React from "react";
import { Line } from "rc-progress";
import { bytesToSize } from "../services/Common";

const StorageBox = ({ data, usb }) => {
  const percent = parseInt(100 - (data.free * 100) / data.size);

  return (
    <div className="StorageBox">
      <div
        className="d-flex"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <span> {percent}%</span>
        <h5 className="no-margin" style={{ width: "auto" }}>
          {data.mountpoints[0].label}
        </h5>
      </div>

      <Line
        style={{ marginTop: ".5rem" }}
        percent={percent}
        strokeColor="#fe4f6b"
        trailColor="#eee"
      />
      <div
        className="d-flex"
        style={{
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingTop: ".7rem"
        }}
      >
        {usb && (
          <span
            className="uk-label uk-label-success"
            style={{ marginTop: "0.7rem" }}
          >
            {window.tr("app.page.dashboard.choies")}
          </span>
        )}
        <span className="ltr">{`${bytesToSize(
          data.size - data.free
        )} / ${bytesToSize(data.size)}`}</span>
      </div>
    </div>
  );
};

export default StorageBox;
