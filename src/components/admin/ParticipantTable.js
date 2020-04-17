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
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  getParticipants,
  searchParticipant,
  clearErrors,
} from "../../actions/participantActions";
import PropTypes from "prop-types";

const ParticipantTable = ({
  participant: { participantData, loading, error },
  getParticipants,
  searchParticipant,
  clearErrors,
}) => {
  useEffect(() => {
    if (participantData == null) {
      getParticipants();
    }
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
      title: "Age",
      dataIndex: "age",
      key: "age",
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
      dataIndex: "grade",
      key: "grade",
      filters: [
        {
          text: "Pre-school",
          value: "Pre-school",
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
      onFilter: (value, record) => record.grade.indexOf(value) === 0,
    },
    {
      title: "Church",
      dataIndex: "church",
      key: "church",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <span>
          <Button type="link">Edit</Button>
        </span>
      ),
      fixed: "right",
    },
  ];

  const onSearchFinished = (value) => {
    console.log("Searching for participant: ", value.search);
    searchParticipant(value.search);
  };

  const errorNotification = () => {
    notification.error({
      message: "Oops",
      description:
        "There was an unexpected error completing this request. Please try again later.",
    });
  };

  if (loading || participantData == null) {
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
                  placeholder="Enter participant last name"
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
              dataSource={participantData.results.map((record) => ({
                ...record,
                key: record.id,
              }))}
              pagination={{
                total: participantData.count,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} volunteers`,
                pageSize: 50,
                defaultCurrent: 1,
              }}
              loading={loading || participantData == null}
              scroll={{ x: 1000 }}
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

ParticipantTable.propTypes = {
  participant: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  getParticipants: PropTypes.func.isRequired,
  searchParticipant: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  participant: state.participant,
  admin: state.admin,
});

export default connect(mapStateToProps, {
  getParticipants,
  searchParticipant,
  clearErrors,
})(ParticipantTable);
