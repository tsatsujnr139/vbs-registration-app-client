import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Input, Form, Button, Table, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  getParticipants,
  searchParticipant,
} from "../../actions/participantActions";
import PropTypes from "prop-types";

const ParticipantTable = ({
  participant: { participants, loading },
  getParticipants,
  searchParticipant,
}) => {
  useEffect(() => {
    getParticipants();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      fixed: "left",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
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
      dataIndex: "class",
      key: "grade",
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
      onFilter: (value, record) => record.class.indexOf(value) === 0,
    },
    {
      title: "Church",
      dataIndex: "church",
      key: "church",
    },
    {
      title: "Medical Information",
      dataIndex: "medicalInfo",
      key: "medicalInfo",
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
    console.log("Searching for participant: ", value);
    searchParticipant(value);
  };

  if (loading) {
    return <Spin size="large" />;
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
              dataSource={participants}
              pagination={true}
              loading={loading}
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
  getParticipants: PropTypes.func.isRequired,
  searchParticipant: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  participant: state.participant,
});

export default connect(mapStateToProps, { getParticipants, searchParticipant })(
  ParticipantTable
);
