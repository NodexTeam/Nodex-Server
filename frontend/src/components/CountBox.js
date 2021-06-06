import React from "react";

const CountBox = props => {
  const { icon, value, name } = props;
  return (
    <div className="CountBox">
      <span uk-icon={`icon: ${icon}; ratio: 2`} />
      <div className="count">
        <h2 className="no-margin">{value}</h2>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default CountBox;
