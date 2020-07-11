import React, { Fragment } from "react";
import { Descriptions } from "antd";
import PropTypes from "prop-types";

const ParticipantDescription = ({ record }) => {
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
        <Descriptions.Item label="First Name" span={1}>
          {record.first_name}
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {record.date_of_birth}
        </Descriptions.Item>
        <Descriptions.Item label="Age">{record.age}</Descriptions.Item>
        <Descriptions.Item label="Gender">{record.gender}</Descriptions.Item>
        <Descriptions.Item label="Class">{record.grade}</Descriptions.Item>
        <Descriptions.Item label="Church" span={3}>
          {record.church}
        </Descriptions.Item>
        <Descriptions.Item label="Medical Information" span={3}>
          {record.medical_info ? record.medical_info : "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Parent Name" span={2}>
          {record.parent_name}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{record.email}</Descriptions.Item>
        <Descriptions.Item label="Primary Contact Number" span={2}>
          {record.primary_contact_no}
        </Descriptions.Item>
        <Descriptions.Item label="Alternate Contact Number">
          {record.alternate_contact_no}
        </Descriptions.Item>
        <Descriptions.Item label="WhatsApp Number">
          {record.whatsApp_no}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Pick Up Person Name" span={2}>
          {record.pickup_person_name}
        </Descriptions.Item>
        <Descriptions.Item label="Pick up Person Phone">
          {record.pickup_person_contact_no}
        </Descriptions.Item> */}
      </Descriptions>
    </Fragment>
  );
};

ParticipantDescription.proptTypes = {
  record: PropTypes.object.isRequired,
};

export default ParticipantDescription;
