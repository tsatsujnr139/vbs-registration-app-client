import React, { Fragment } from "react";
import { Descriptions } from "antd";

const ParticipantDescription = (data) => {
  return (
    <Fragment>
      <Descriptions
        layout="vertical"
        size="default"
        column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        bordered
      >
        <Descriptions.Item label="Surname" span={2}>
          {data.last_name}
        </Descriptions.Item>
        <Descriptions.Item label="First Name" span={1}>
          {data.first_name}
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {data.date_of_birth}
        </Descriptions.Item>
        <Descriptions.Item label="Age">{data.age}</Descriptions.Item>
        <Descriptions.Item label="Gender">{data.gender}</Descriptions.Item>
        <Descriptions.Item label="Class">{data.grade}</Descriptions.Item>
        <Descriptions.Item label="Church" span={3}>
          {data.church}
        </Descriptions.Item>
        <Descriptions.Item label="Medical Information" span={3}>
          {data.medical_info ? data.medical_info : "N/A"}
        </Descriptions.Item>
      </Descriptions>
    </Fragment>
  );
};

export default ParticipantDescription;
