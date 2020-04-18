import React, { Fragment } from "react";
import { Row, Col, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CountUp from "react-countup";
import { ChartCard, Field } from "ant-design-pro/lib/Charts";

const Dashboard = ({ admin: { loading }, dashboardData }) => {
  return (
    <Fragment>
      <Row align="top" gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col span={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <ChartCard
            bordered={false}
            hoverable={true}
            loading={loading || dashboardData == null}
            title="Participants"
            action={
              <Tooltip title="Total Number of particpants registered so far">
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={() => (
              <CountUp
                delay={0.5}
                duration={2}
                end={dashboardData.overview.participants}
              />
            )}
            footer={
              <Field
                label="This Week"
                value={
                  dashboardData != null &&
                  dashboardData.overview.participants_this_week
                }
              />
            }
          ></ChartCard>
        </Col>
        <Col span={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <ChartCard
            bordered={false}
            hoverable={true}
            loading={loading || dashboardData == null}
            title="Volunteers"
            action={
              <Tooltip title="Total Number of volunteers registered so far">
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={() => (
              <CountUp
                delay={0.5}
                duration={2}
                end={dashboardData.overview.volunteers}
              />
            )}
            footer={
              <Field
                label="This Week"
                value={
                  dashboardData != null &&
                  dashboardData.overview.volunteers_this_week
                }
              />
            }
          ></ChartCard>
        </Col>
        <Col span={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <ChartCard
            bordered={false}
            hoverable={true}
            loading={loading || dashboardData == null}
            title="Participant Churches"
            action={
              <Tooltip title="Total Number of Churches Represented by Participants">
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={() => (
              <CountUp
                delay={0.5}
                duration={2}
                end={dashboardData.overview.participant_churches}
              />
            )}
            footer={
              <Field
                label="This week"
                value={
                  dashboardData != null &&
                  dashboardData.overview.participant_churches_this_week
                }
              />
            }
          ></ChartCard>
        </Col>
        <Col span={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <ChartCard
            bordered={false}
            hoverable={true}
            loading={loading || dashboardData == null}
            title="Volunteer Churches"
            action={
              <Tooltip title="Total Number of Churches Represented by Volunteers">
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={() => (
              <CountUp
                delay={0.5}
                duration={2}
                end={dashboardData.overview.volunteer_churches}
              />
            )}
            footer={
              <Field
                label="This week"
                value={
                  dashboardData != null &&
                  dashboardData.overview.volunteer_churches_this_week
                }
              />
            }
          ></ChartCard>
        </Col>
      </Row>
    </Fragment>
  );
};

Dashboard.proptTypes = {
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(Dashboard);
