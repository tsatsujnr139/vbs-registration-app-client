import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Input,
  Form,
  Button,
  Table,
  Spin,
  notification,
  Modal,
  Descriptions,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import {
  getVolunteers,
  searchVolunteer,
  clearErrors,
} from "../../actions/volunteerActions";

const VolunteerTable = ({
  volunteer: { volunteerData, loading, error },
  searchVolunteer,
  getVolunteers,
  clearErrors,
}) => {
  useEffect(() => {
    getVolunteers();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      fixed: "left",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      fixed: "left",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
        },
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
    },
    {
      title: "Class",
      dataIndex: "preferred_class",
      key: "preferred_class",
      filters: [
        {
          text: "Preschool",
          value: "Preschool 1",
        },
        {
          text: "Class 1",
          value: "Class 1",
        },
        {
          text: "Class 2",
          value: "Class 2",
        },
        {
          text: "Class 3",
          value: "Class 3",
        },
        {
          text: "Class 4",
          value: "Class 4",
        },
        {
          text: "Class 5",
          value: "Class 5",
        },
        {
          text: "Class 6",
          value: "Class 6",
        },
        {
          text: "JHS 1",
          value: "JHS 1",
        },
        {
          text: "JHS 2",
          value: "JHS 2",
        },
        {
          text: "JHS 3",
          value: "JHS 3",
        },
      ],
      onFilter: (value, record) => record.preferred_class.indexOf(value) === 0,
    },
    {
      title: "Church",
      dataIndex: "church",
      key: "church",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <span>
          <Button type="link" onClick={() => showViewModal(record)}>
            View
          </Button>
          <Button type="link">Edit</Button>
        </span>
      ),
      fixed: "right",
    },
  ];

  const showViewModal = (data) => {
    Modal.info({
      title: "Volunteer Details",
      width: 700,
      content: (
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
      ),
    });
  };

  const errorNotification = () => {
    notification.error({
      message: "Oops",
      description:
        "There was an unexpected error completing this request. Please try again later.",
    });
  };

  const onSearchFinished = (value) => {
    console.log("Searching for volunteer : ", value.search);
    searchVolunteer(value.search);
  };

  if (loading || volunteerData == null) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "200px" }} />
    );
  }

  if (error) {
    errorNotification();
    clearErrors();
  }

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <Card>
            <Form onFinish={onSearchFinished}>
              <Form.Item
                name="search"
                rules={[{ required: true, message: "Please enter something" }]}
              >
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Search by volunteer last name"
                  allowClear
                />
              </Form.Item>
              <Form.Item>
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  Search
                </Button>
              </Form.Item>
            </Form>
            <Table
              columns={columns}
              dataSource={volunteerData.results.map((record) => ({
                ...record,
                key: record.id,
              }))}
              pagination={{
                total: volunteerData.count,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} volunteers`,
                pageSize: 50,
                defaultCurrent: 1,
              }}
              loading={loading || volunteerData == null}
              scroll={{ x: 1000 }}
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

VolunteerTable.propTypes = {
  searchVolunteer: PropTypes.func.isRequired,
  getVolunteers: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  volunteer: state.volunteer,
});

export default connect(mapStateToProps, {
  getVolunteers,
  searchVolunteer,
  clearErrors,
})(VolunteerTable);
