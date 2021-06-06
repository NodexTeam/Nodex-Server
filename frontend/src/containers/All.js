import React from "react";
import { connect } from "react-redux";
import DownloadBox from "../components/DownloadBox";
import Aux from "../components/Hoc";
import NotFound from "../components/NotFound";

class All extends React.Component {
  render = () => {
    const { downloading, wait, downloaded } = this.props;
    const all = [...downloading, ...wait, ...downloaded];

    return (
      <Aux>
        {!all.length > 0 ? (
          <NotFound />
        ) : (
          <div
            className="uk-grid uk-grid-small"
            uk-grid="masonry: true"
            style={{ direction: "ltr" }}
          >
            {all.map((item, index) => (
              <div className="uk-width-1-3@m uk-width-1-1@s" key={index}>
                <DownloadBox data={item} />
              </div>
            ))}
          </div>
        )}
      </Aux>
    );
  };
}

export default connect(
  state => ({
    downloading: state.Socket.downloading,
    downloaded: state.Socket.downloaded,
    wait: state.Socket.wait
  }),
  null
)(All);
