import React from "react";

const NotFound = () => {
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          paddingTop: "50px",
          fontFamily: "QuickSand",
          fontSizeAdjust: "1.0"
        }}
      >
        <h1>
          <strong>404</strong>
        </h1>
        <br />
        <h3>
          Oops! Looks like this page is still under construction. Click{" "}
          <a href="/">here</a> to be redirected to the home page
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
