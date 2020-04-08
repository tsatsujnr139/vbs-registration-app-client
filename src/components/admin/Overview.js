import React, { Fragment } from "react";
import { Row, Col, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CountUp from "react-countup";
import { ChartCard, Field } from "ant-design-pro/lib/Charts";
import NumberInfo from "ant-design-pro/lib/NumberInfo";

const Dashboard = ({ admin: { loading, dashboardData } }) => {
  return (
    <Fragment>
      <Row align="top" gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col span={8} xl={8} lg={8} md={24} sm={24} xs={24}>
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
                end={dashboardData.overview.participantCount}
              />
            )}
            footer={
              <Field
                label="This Week"
                value={
                  dashboardData != null &&
                  dashboardData.overview.participantsThisWeek
                }
              />
            }
          ></ChartCard>
        </Col>
        <Col span={8} xl={8} lg={8} md={24} sm={24} xs={24}>
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
                end={dashboardData.overview.volunteerCount}
              />
            )}
            footer={
              <Field
                label="This Week"
                value={
                  dashboardData != null &&
                  dashboardData.overview.volunteersThisWeek
                }
              />
            }
          ></ChartCard>
        </Col>
        <Col span={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <ChartCard
            bordered={false}
            hoverable={true}
            loading={loading || dashboardData == null}
            title="Churches Represented"
            action={
              <Tooltip title="Total Number of churches represented">
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={() => (
              <CountUp
                delay={0.5}
                duration={2}
                end={dashboardData.overview.churchCount}
              />
            )}
            footer={
              <Field
                label="This week"
                value={
                  dashboardData != null &&
                  dashboardData.overview.churchesThisWeek
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
