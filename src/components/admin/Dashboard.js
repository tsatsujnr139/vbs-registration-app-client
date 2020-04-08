import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDashboardData } from "../../actions/adminActions";
import Overview from "./Overview";
import Distributions from "./Distributions";

const Dashboard = ({ admin: { dashboardData }, getDashboardData }) => {
  useEffect(() => {
    getDashboardData();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Overview dashboardData={dashboardData} />
      <Distributions dashboardData={dashboardData} />
    </Fragment>
  );
};

Dashboard.proptTypes = {
  admin: PropTypes.object.isRequired,
  getDashboardData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, { getDashboardData })(Dashboard);
