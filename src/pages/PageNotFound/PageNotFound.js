import React from "react";
import { useHistory } from "react-router-dom";
const PageNotFound = () => {
  const history = useHistory();
  const style = {
    height: "100vh",
    width: "100vw",
    display: "grid",
    placeItems: "center",
  };

  return (
    <div style={style}>
      <span onClick={() => history.push("/")} style={{ cursor: "pointer" }}>
        404 | Page Not Found
      </span>
    </div>
  );
};

export default PageNotFound;
