import React from "react";

import { ReactComponent as CustomSpinner } from "../../assets/icons/Loader.svg";

function Loader() {
  return (
    <div
      style={{
        height: "75vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="text-center">
        <CustomSpinner width="150px" height="150px" />
        <p className="fs-4">Loading</p>
      </div>
    </div>
  );
}

export default Loader;
