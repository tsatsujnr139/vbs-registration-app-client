import React, { Fragment, useEffect } from "react";
import { Card, Spin, Row, Col } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRegistrationStats } from "../../actions/adminActions";
import { ReactComponent as Volunteers } from "../../static/images/volunteers.svg";
import { ReactComponent as Kids } from "../../static/images/kidsPlaying.svg";
import { ReactComponent as Church } from "../../static/images/church.svg";
import CountUp from "react-countup";

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
      <Row align="top" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <Card hoverable="true" loading={loading}>
            <div className="dashboard-overview-card-title">
              Registered Participants
            </div>
            <Row>
              <Col span={12}>
                <Kids />
              </Col>
              <Col span={12} className="dashboard-overview-card-value">
                <CountUp
                  delay={0.5}
                  duration={2}
                  end={stats.participantCount}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <Card hoverable="true" loading={loading}>
            <div className="dashboard-overview-card-title">
              Registered Volunteers
            </div>
            <Row>
              <Col span={12}>
                <Volunteers />
              </Col>
              <Col span={12} className="dashboard-overview-card-value">
                <CountUp delay={0.5} duration={2} end={stats.volunteerCount} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <Card hoverable="true" loading={loading}>
            <div className="dashboard-overview-card-title">
              Churches Represented
            </div>
            <Row>
              <Col span={12}>
                <Church />
              </Col>
              <Col span={12} className="dashboard-overview-card-value">
                <CountUp delay={0.5} duration={2} end={stats.churchCount} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
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
