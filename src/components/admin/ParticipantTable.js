import React, { Fragment } from "react";
import { Row, Col, Card, Input, Form, Button, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Table from "ant-responsive-table";

const ParticipantTable = () => {
  const columns = [
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      showOnResponse: true,
      showOnDesktop: true
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      showOnResponse: true,
      showOnDesktop: true
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      showOnResponse: false,
      showOnDesktop: true
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      showOnResponse: false,
      showOnDesktop: true,
      filters: [
        {
          text: "Male",
          value: "Male"
        },
        {
          text: "Female",
          value: "Female"
        }
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      showOnResponse: true,
      showOnDesktop: true,
      filters: [
        {
          text: "Male",
          value: "Male"
        },
        {
          text: "Female",
          value: "Female"
        }
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0
    },
    {
      title: "Church",
      dataIndex: "church",
      key: "church",
      showOnResponse: false,
      showOnDesktop: true
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link">View Details</Button>
          <Button type="link">Edit</Button>
        </span>
      ),
      showOnResponse: true,
      showOnDesktop: true
    }
  ];

  const dataSource = [
    {
      key: "1",
      firstName: "Aba",
      lastName: "Asomaning",
      class: "JHS 1",
      church: "Legon Interdenominational Church",
      age: 13,
      gender: "Female"
    },
    {
      key: "2",
      firstName: "Adoma",
      lastName: "Asomaning",
      class: "Class 3",
      church: "Legon Interdenominational Church",
      age: 9,
      gender: "Female"
    }
  ];

  const onSearchFinished = value => {
    console.log("Searching for:", value);
  };

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
              antTableProps={{
                showHeader: true,
                columns,
                dataSource,
                pagination: false,
                loading: false
              }}
              mobileBreakPoint={800}
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ParticipantTable;
