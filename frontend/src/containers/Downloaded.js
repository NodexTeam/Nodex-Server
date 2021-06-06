import React from "react";
import { connect } from "react-redux";
import DownloadBox from "../components/DownloadBox";

import Aux from "../components/Hoc";
import NotFound from "../components/NotFound";

class Downloaded extends React.Component {
  render = () => {
    const { downloaded } = this.props;

    return (
      <Aux>
        {!downloaded.length > 0 ? (
          <NotFound />
        ) : (
          <div
            className="uk-grid uk-grid-small"
            uk-grid="masonry: true"
            style={{ direction: "ltr" }}
          >
            {downloaded.map((item, index) => (
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
    downloaded: state.Socket.downloaded
  }),
  null
)(Downloaded);
