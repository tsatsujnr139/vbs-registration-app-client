import "ant-design-pro/dist/ant-design-pro.css";

import { Card, Col, Row } from "antd";
import React, { Fragment } from "react";

import { Pie } from "ant-design-pro/lib/Charts";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Distributions = ({ admin: { loading }, dashboardData }) => {
  return (
    <Fragment>
      <Row
        gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        style={{ minHeight: "800px", padding: "20px 0px 20px 0px" }}
      >
        <Col span={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="Participant Class Distribution"
            hoverable={true}
            loading={loading || dashboardData == null}
          >
            <Pie
              hasLegend
              title="Participant Class Distribution"
              subTitle="Total"
              total={() => (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      dashboardData.distributions.participant_class_distribution.reduce(
                        (pre, now) => now.count + pre,
                        0
                      ),
                  }}
                />
              )}
              data={
                dashboardData != null &&
                dashboardData.distributions.participant_class_distribution.map(
                  record => ({ x: record.grade, y: record.count })
                )
              }
              valueFormat={val => (
                <span dangerouslySetInnerHTML={{ __html: val }} />
              )}
              height={350}
              lineWidth={4}
            />
          </Card>
        </Col>
        <Col span={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="Volunteer Class Distribution"
            hoverable={true}
            loading={loading || dashboardData == null}
          >
            <Pie
              hasLegend
              title="Volunteer Class Distribution"
              subTitle="Total"
              total={() => (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      dashboardData.distributions.volunteer_class_distribution.reduce(
                        (pre, now) => now.count + pre,
                        0
                      ),
                  }}
                />
              )}
              data={
                dashboardData != null &&
                dashboardData.distributions.volunteer_class_distribution.map(
                  record => ({ x: record.preferred_class, y: record.count })
                )
              }
              valueFormat={val => (
                <span dangerouslySetInnerHTML={{ __html: val }} />
              )}
              height={350}
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

Distributions.proptTypes = {
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(Distributions);
