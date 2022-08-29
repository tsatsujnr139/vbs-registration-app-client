import { Breadcrumb, Card, Col, PageHeader, Row } from "antd"
import { HomeOutlined, UserOutlined } from "@ant-design/icons"
import React, { Fragment } from "react"

import ParticipantPickupTable from "./ParticipantPickupTable"

const ParticipantPickupDashboard = () => {
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
      <ParticipantPickupTable />
    </Fragment>
  )
}

export default ParticipantPickupDashboard
