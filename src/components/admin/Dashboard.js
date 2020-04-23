import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDashboardData, clearErrors } from "../../actions/adminActions";
import { notification } from "antd";
import Overview from "./Overview";
import Distributions from "./Distributions";

const Dashboard = ({ admin: { dashboardData, error }, getDashboardData }) => {
  useEffect(() => {
    clearErrors();
    getDashboardData();
    if (error) {
      errorNotification();
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  const errorNotification = () => {
    notification.error({
      message: "Sorry",
      description: error,
    });
  };

  return (
    <Fragment>
      <Overview dashboardData={dashboardData} />
      <Distributions dashboardData={dashboardData} />
    </Fragment>
  );
};

Dashboard.propTypes = {
  admin: PropTypes.object.isRequired,
  getDashboardData: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, { getDashboardData, clearErrors })(
  Dashboard
);
