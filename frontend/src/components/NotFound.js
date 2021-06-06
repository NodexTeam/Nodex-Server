import React from "react";

const NotFound = props => (
  <div className="NotFound" {...props}>
    <span uk-icon="icon :happy; ratio: 6" />
    <h3>{props.text || window.tr("app.error.pageNotFound")}</h3>
  </div>
);

export default NotFound;
