import React, { Fragment } from "react";
import { Breadcrumb, PageHeader, Card, Row, Col } from "antd";
import { HomeOutlined, TeamOutlined } from "@ant-design/icons";
import VolunteerTable from "./VolunteerTable";

const VolunteerDashboard = () => {
  return (
    <Fragment>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col span={24}>
          <Card>
            <Breadcrumb>
              <Breadcrumb.Item>
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <TeamOutlined />
                <span>Volunteers</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <PageHeader title="Volunteers" />
          </Card>
        </Col>
      </Row>
      <VolunteerTable />
    </Fragment>
  );
};

export default VolunteerDashboard;
