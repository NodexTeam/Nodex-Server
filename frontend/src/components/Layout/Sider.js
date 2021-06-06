import React from "react";
import { Link } from "react-router-dom";
import conf from "../../config";
import HumanIcon from "../../assets/images/human.svg";

const { routes } = conf;
const SiderItems = [
  {
    icon: "home",
    name: window.tr("app.layout.sider.dashboard"),
    link: routes.dashboard
  },
  {
    icon: "album",
    name: window.tr("app.layout.sider.all"),
    link: routes.all
  },
  {
    icon: "database",
    name: window.tr("app.layout.sider.downloaded"),
    link: routes.downloaded
  },
  {
    icon: "clock",
    name: window.tr("app.layout.sider.wait"),
    link: routes.wait
  },
  {
    icon: "cloud-download",
    name: window.tr("app.layout.sider.downloading"),
    link: routes.downloading
  }
];

const SiderItem = props => {
  const { data } = props;
  data.active = window.location.pathname === data.link;

  return (
    <Link to={data.link} style={{ textDecoration: "none" }}>
      <div className={`sider-item ${data.active ? "active" : ""}`}>
        <i uk-icon={`icon: ${data.icon}; ratio: 1.2`} />
        <p className="no-margin">{data.name}</p>
      </div>
    </Link>
  );
};

const Sider = props => {
  return (
    <div className="sider">
      <div className="human-wrapper">
        <img
          src={HumanIcon}
          alt="Human Logo"
          className="uk-padding-small"
          width="90%"
        />
      </div>
      <div className="sider-item-wrapper">
        {SiderItems.map((item, index) => (
          <SiderItem data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Sider;
