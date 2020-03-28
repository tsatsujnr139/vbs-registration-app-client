import React, { Fragment, useEffect } from "react";
import { Spin, Row, Col, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRegistrationStats } from "../../actions/adminActions";
import CountUp from "react-countup";
import { ChartCard, Field } from "ant-design-pro/lib/Charts";

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
      <Row align="top" gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col span={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <ChartCard
            bordered={false}
            hoverable={true}
            title="Participants"
            action={
              <Tooltip title="Total Number of particpants registered so far">
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={() => (
              <CountUp delay={0.5} duration={2} end={stats.participantCount} />
            )}
            footer={<Field label="Registrations this Week" value="50" />}
          ></ChartCard>
        </Col>
        <Col span={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <ChartCard
            bordered={false}
            hoverable={true}
            title="Volunteers"
            action={
              <Tooltip title="Total Number of volunteers registered so far">
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={() => (
              <CountUp delay={0.5} duration={2} end={stats.volunteerCount} />
            )}
            footer={<Field label="Registrations this Week" value="10" />}
          ></ChartCard>
        </Col>
        <Col span={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <ChartCard
            bordered={false}
            title="Churches Represented"
            hoverable={true}
            action={
              <Tooltip title="Total Number of churches represented">
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={() => (
              <CountUp delay={0.5} duration={2} end={stats.churchCount} />
            )}
            footer={<Field label="New churches this week" value="2" />}
          ></ChartCard>
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
