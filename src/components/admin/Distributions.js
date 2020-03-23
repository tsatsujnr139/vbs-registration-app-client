import React, { Fragment } from "react";
import { Row, Col } from "antd";
import { Pie, ChartCard } from "ant-design-pro/lib/Charts";
import "ant-design-pro/dist/ant-design-pro.css";

const salesPieData = [
  {
    x: "Pre-school",
    y: 100
  },
  {
    x: "Class 1",
    y: 42
  },
  {
    x: "Class 2",
    y: 36
  },
  {
    x: "Class 3",
    y: 37
  },
  {
    x: "Class 4",
    y: 39
  },
  {
    x: "Class 5",
    y: 36
  },
  {
    x: "Class 6",
    y: 30
  },
  {
    x: "JHS 1",
    y: 40
  },
  {
    x: "JHS 2",
    y: 45
  },
  {
    x: "JHS 3",
    y: 24
  }
];

const Distributions = () => {
  return (
    <Fragment>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <ChartCard
            title="Participant Class Distribution"
            loading={false}
            contentHeight={350}
            bordered={false}
          >
            <Pie
              hasLegend
              title="Participant Class Distribution"
              subTitle="Total"
              total={() => (
                <span
                  dangerouslySetInnerHTML={{
                    __html: salesPieData.reduce((pre, now) => now.y + pre, 0)
                  }}
                />
              )}
              data={salesPieData}
              valueFormat={val => (
                <span dangerouslySetInnerHTML={{ __html: val }} />
              )}
              height={350}
            />
          </ChartCard>
        </Col>
        <Col span={12}>
          <ChartCard
            title="Volunteer Class Distribution"
            loading={false}
            contentHeight={350}
          >
            <Pie
              hasLegend
              title="Volunteer Class Distribution"
              subTitle="Total"
              total={() => (
                <span
                  dangerouslySetInnerHTML={{
                    __html: salesPieData.reduce((pre, now) => now.y + pre, 0)
                  }}
                />
              )}
              data={salesPieData}
              valueFormat={val => (
                <span dangerouslySetInnerHTML={{ __html: val }} />
              )}
              height={350}
            />
          </ChartCard>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Distributions;
