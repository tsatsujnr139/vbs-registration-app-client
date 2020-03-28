import React, { Fragment } from "react";
import { Breadcrumb, PageHeader, Card } from "antd";
import { HomeOutlined, TeamOutlined } from "@ant-design/icons";

const VolunteerDashboard = () => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default VolunteerDashboard;
