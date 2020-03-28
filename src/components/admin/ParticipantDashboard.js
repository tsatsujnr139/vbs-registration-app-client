import React, { Fragment } from "react";
import { Breadcrumb, PageHeader, Card, Row, Col } from "antd";
import ParticipantTable from "../admin/ParticipantTable";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const ParticipantDashboard = () => {
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
                <UserOutlined />
                <span>Participants</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <PageHeader title="Participants" />
          </Card>
        </Col>
      </Row>
      <ParticipantTable />
    </Fragment>
  );
};

export default ParticipantDashboard;
