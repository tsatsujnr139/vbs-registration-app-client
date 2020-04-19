import React, { Fragment } from "react";
import { Descriptions } from "antd";

const VolunteerDescription = (data) => {
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
        <Descriptions.Item label="First Name">
          {data.first_name}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">{data.gender}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {data.contact_no}
        </Descriptions.Item>
        <Descriptions.Item label="WhatsApp Number">
          {data.whatsApp_no}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
        <Descriptions.Item label="Role">
          {data.preferred_role}
        </Descriptions.Item>
        <Descriptions.Item label="Preferred Class">
          {data.preferred_class}
        </Descriptions.Item>
        <Descriptions.Item label="Church" span={3}>
          {data.church}
        </Descriptions.Item>
        <Descriptions.Item label="Previous Volunteer" span={1}>
          {data.previous_volunteer === "True" ? "Yes" : "No"}
        </Descriptions.Item>
        {data.previous_volunteer === "True" && (
          <Descriptions.Item label="Previous Volunteer Site" span={2}>
            {data.previous_site}
          </Descriptions.Item>
        )}
      </Descriptions>
    </Fragment>
  );
};

export default VolunteerDescription;
