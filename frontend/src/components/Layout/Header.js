import React from "react";
import config from "../../config";
import NodexLogo from "../../assets/images/Logo.png";

const Header = props => {
  const pathName = window.location.pathname;
  const { dashboard, all, downloading, downloaded, wait } = config.routes;

  return (
    <div className="header uk-padding-small">
      <ul className="uk-breadcrumb">
        <li>
          <span uk-icon="icon: home; ratio: .85" />
        </li>
        <li>
          <span>
            {pathName === dashboard
              ? window.tr("app.layout.sider.dashboard")
              : pathName === all
                ? window.tr("app.layout.sider.all")
                : pathName === downloaded
                  ? window.tr("app.layout.sider.downloaded")
                  : pathName === wait
                    ? window.tr("app.layout.sider.wait")
                    : pathName === downloading &&
                    window.tr("app.layout.sider.downloading")}
          </span>
        </li>
      </ul>
      <img src={NodexLogo} alt="nodex logo" />
    </div>
  );
};

export default Header;
