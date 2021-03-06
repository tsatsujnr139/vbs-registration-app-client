import React, { Fragment, useEffect } from "react";
import { connect, Provider } from "react-redux";
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
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  getParticipants,
  searchParticipant,
  clearErrors,
  updateParticipant,
} from "../../actions/participantActions";
import PropTypes from "prop-types";
import ParticipantDescription from "./ParticipantDescription";
import EditParticipant from "./EditParticipant";
import storeConfig from "../../store";

const ParticipantTable = ({
  participant: { participantData, loading, error, success },
  getParticipants,
  searchParticipant,
  updateParticipant,
  clearErrors,
}) => {
  useEffect(() => {
    clearErrors();
    if (participantData == null) {
      getParticipants();
    }
    if (error) {
      errorNotification();
      clearErrors();
    }
    if (success) {
      successNotification();
    }
    // eslint-disable-next-line
  }, [error, success]);
  const [form] = Form.useForm();
  const { store } = storeConfig;
  const { Search } = Input;

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
        {
          text: "SHS 1",
          value: "SHS 1",
        },
        {
          text: "SHS 2",
          value: "SHS 2",
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
      render: (record) => (
        <span>
          <Button type="link" onClick={() => showViewModal(record)}>
            View
          </Button>
          <Button type="link" onClick={() => showEditModal(record)}>
            Edit
          </Button>
        </span>
      ),
      fixed: "right",
    },
  ];

  const showViewModal = (record) => {
    Modal.info({
      title: "Participant Details",
      width: 700,
      content: <ParticipantDescription record={record} />,
    });
  };

  const showEditModal = (record) => {
    Modal.confirm({
      title: "Edit Participant Details",
      width: 700,
      content: (
        <Provider store={store}>
          <EditParticipant record={record} form={form} />
        </Provider>
      ),
      okText: "Update",
      onOk() {
        form
          .validateFields()
          .then((fieldsValue) => {
            const dob = fieldsValue["date_of_birth"];
            const values = {
              ...fieldsValue,
              date_of_birth: dob.format("YYYY-MM-DD"),
            };
            updateParticipant(record.id, values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      },
    });
  };

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

  const successNotification = () => {
    notification.success({
      message: "Awesome!",
      description: "Successfully updated participant details",
    });
  };

  if (loading || participantData == null) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "200px" }} />
    );
  }

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <Card style={{ marginBottom: "200px" }}>
            <Form onFinish={onSearchFinished}>
              <Form.Item
                name="search"
                rules={[{ required: true, message: "Please enter something" }]}
              >
                <Search
                  // prefix={<SearchOutlined />}
                  placeholder="Search by participant last name..."
                  allowClear
                  loading={loading}
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
                  `${range[0]}-${range[1]} of ${total} participants`,
                pageSize: 20,
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
  updateParticipant,
  clearErrors,
})(ParticipantTable);
