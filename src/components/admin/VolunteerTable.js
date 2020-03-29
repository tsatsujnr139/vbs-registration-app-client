import React, { Fragment } from "react";
import { Row, Col, Card, Input, Form, Button, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ParticipantTable = () => {
  const columns = [
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      fixed: "left"
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      fixed: "left"
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
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
      key: "church"
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <span>
          <Button type="link">Edit</Button>
        </span>
      ),
      fixed: "right"
    }
  ];

  const dataSource = [
    {
      key: "1",
      firstName: "Tsatsu",
      lastName: "Adogla-Bessa",
      class: "Pre-school",
      church: "Legon Interdenominational Church",
      gender: "Male"
    },
    {
      key: "2",
      firstName: "Sena",
      lastName: "Adogla-Bessa",
      class: "Class 1",
      church: "Legon Interdenominational Church",
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
                  placeholder="Enter volunteer last name"
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
              dataSource={dataSource}
              pagination={true}
              loading={false}
              scroll={{ x: 1000 }}
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ParticipantTable;
