import React from "react";

const Option = ({ children, value }) => {
  return <div className="option" data-value={value}>{children}</div>;
};

export default Option;
