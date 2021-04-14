import * as React from "react";

const style = require("./ErrorMessage.module.scss");

export const ErrorMessage: React.FC = ({ children }) => (
  <div className={style["error"]}>{children}</div>
);
