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
      title: "Age",
      dataIndex: "age",
      key: "age"
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
      title: "Medical Information",
      dataIndex: "medicalInfo",
      key: "medicalInfo"
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
      firstName: "Aba",
      lastName: "Asomaning",
      class: "JHS 1",
      church: "Legon Interdenominational Church",
      age: 13,
      gender: "Female",
      medicalInfo: "Allergic to pineapple"
    },
    {
      key: "2",
      firstName: "Adoma",
      lastName: "Asomaning",
      class: "Class 3",
      church: "Legon Interdenominational Church",
      age: 9,
      gender: "Female",
      medicalInfo: "N/A"
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
