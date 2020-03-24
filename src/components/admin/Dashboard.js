import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRegistrationStats } from "../../actions/adminActions";
import Overview from "./Overview";
import Distributions from "./Distributions";
import { Divider } from "antd";

const Dashboard = ({ admin: { loading, stats }, getRegistrationStats }) => {
  useEffect(() => {
    getRegistrationStats();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Overview />
      <Divider
        orientation="left"
        style={{ color: "#333", fontWeight: "normal" }}
      ></Divider>
      <Distributions />
    </Fragment>
  );
};

Dashboard.proptTypes = {
  admin: PropTypes.object.isRequired,
  getRegistrationStats: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps, { getRegistrationStats })(Dashboard);
