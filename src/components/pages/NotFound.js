import React, { Fragment } from "react";
import { Result, Button } from "antd";

const NotFound = () => {
  return (
    <Fragment>
      <Result
        status="404"
        title="Oops looks like you took a wrong turn"
        subTitle="Click the button below to go back to the home page"
        extra={
          <Button type="primary" href="/">
            Back Home
          </Button>
        }
      />
      ,
    </Fragment>
  );
};

export default NotFound;
