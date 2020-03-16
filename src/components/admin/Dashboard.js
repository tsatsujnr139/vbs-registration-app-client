import React, { Fragment, useEffect } from "react";
import { Card, Skeleton, Spin, Row, PageHeader } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRegistrationStats } from "../../actions/adminActions";
import { ReactComponent as Volunteers } from "../../static/images/volunteers.svg";
import { ReactComponent as Kids } from "../../static/images/kidsPlaying.svg";
import { ReactComponent as Church } from "../../static/images/church.svg";
import CountUp from 'react-countup'

const Dashboard = ({ admin: { loading, stats }, getRegistrationStats }) => {
  useEffect(() => {
    getRegistrationStats();
    // eslint-disable-next-line
  }, []);

  if (loading || stats == null) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "100px" }} />
    );
  }

  return (
    <Fragment>
      {/* <PageHeader className="site-page-header" title="Dashboard" /> */}
      <Row align="middle">
        <Card hoverable="true" style={cardStyle}>
          <Skeleton loading={loading} avatar active>
            <Kids/>
            <div className="dashboard-overview-card-title">Registered Participants</div>
            <CountUp className="dashboard-overview-card-value" delay={1} duration={3.75} end={stats.participantCount}/>
          </Skeleton>
        </Card>
        <span
          style={{
            display: "inline-block",
            width: "45px",
            textAlign: "center"
          }}
        ></span>
        <Card hoverable="true" style={cardStyle}>
          <Volunteers />
          <Skeleton loading={loading} avatar active>
            <div className="dashboard-overview-card-title">Registered Volunteers</div>
            <CountUp className="dashboard-overview-card-value" delay={1} duration={3.75} end={stats.volunteerCount}/>
          </Skeleton>
        </Card>
        <span
          style={{
            display: "inline-block",
            width: "45px",
            textAlign: "center"
          }}
        ></span>
        <Card hoverable="true" style={cardStyle}>
          <Church/>
          <Skeleton loading={loading} avatar active>
            <div className="dashboard-overview-card-title">Churches Represented</div>
            <CountUp className="dashboard-overview-card-value" delay={1} duration={3.75} end={stats.churchCount}/>
          </Skeleton>
        </Card>
      </Row>
    </Fragment>
  );
};

const cardStyle = {
  width: 350,
  height: 180,
  marginTop: 16,
  borderRadius: "12px"
};

Dashboard.proptTypes = {
  admin: PropTypes.object.isRequired,
  getRegistrationStats: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps, { getRegistrationStats })(Dashboard);
