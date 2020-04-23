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
import PropTypes from "prop-types";
import {
  getVolunteers,
  searchVolunteer,
  updateVolunteer,
  clearErrors,
} from "../../actions/volunteerActions";
import VolunteerDescription from "./VolunteerDescription";
import EditVolunteer from "./EditVolunteer";
import storeConfig from "../../store";

const VolunteerTable = ({
  volunteer: { volunteerData, loading, error, success },
  searchVolunteer,
  getVolunteers,
  updateVolunteer,
  clearErrors,
}) => {
  useEffect(() => {
    getVolunteers();
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
      title: "Volunteer Details",
      width: 700,
      content: <VolunteerDescription record={record} />,
    });
  };

  const showEditModal = (record) => {
    Modal.confirm({
      destroyOnClose: true,
      title: "Edit Volunteer Details",
      width: 700,
      content: (
        <Provider store={store}>
          <EditVolunteer record={record} form={form} />
        </Provider>
      ),
      okText: "Update",
      onOk() {
        form
          .validateFields()
          .then((fieldsValue) => {
            const previous_volunteer = fieldsValue["previous_volunteer"];
            const values = {
              ...fieldsValue,
              previous_volunteer: previous_volunteer === "true" ? true : false,
            };
            updateVolunteer(record.id, values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      },
    });
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
      description: "Successfully updated volunteer details",
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
                  placeholder="Search by volunteer last name"
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
  updateVolunteer: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  volunteer: state.volunteer,
});

export default connect(mapStateToProps, {
  getVolunteers,
  searchVolunteer,
  updateVolunteer,
  clearErrors,
})(VolunteerTable);
