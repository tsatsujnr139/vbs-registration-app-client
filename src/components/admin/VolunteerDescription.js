import React, { Fragment } from "react";
import { Descriptions } from "antd";
import PropTypes from "prop-types";

const VolunteerDescription = ({ record }) => {
  return (
    <Fragment>
      <Descriptions
        layout="vertical"
        size="default"
        column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        bordered
      >
        <Descriptions.Item label="Surname" span={2}>
          {record.last_name}
        </Descriptions.Item>
        <Descriptions.Item label="First Name">
          {record.first_name}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">{record.gender}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {record.contact_no}
        </Descriptions.Item>
        <Descriptions.Item label="WhatsApp Number">
          {record.whatsApp_no}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{record.email}</Descriptions.Item>
        <Descriptions.Item label="Role">
          {record.preferred_role}
        </Descriptions.Item>
        <Descriptions.Item label="Preferred Class">
          {record.preferred_class}
        </Descriptions.Item>
        <Descriptions.Item label="Church" span={3}>
          {record.church}
        </Descriptions.Item>
        <Descriptions.Item label="Previous Volunteer" span={1}>
          {record.previous_volunteer === "True" ? "Yes" : "No"}
        </Descriptions.Item>
        {record.previous_volunteer === "True" && (
          <Descriptions.Item label="Previous Volunteer Site" span={2}>
            {record.previous_site}
          </Descriptions.Item>
        )}
      </Descriptions>
    </Fragment>
  );
};

VolunteerDescription.propTypes = {
  record: PropTypes.object.isRequired,
};

export default VolunteerDescription;
