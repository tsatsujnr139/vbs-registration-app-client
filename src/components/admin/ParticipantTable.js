import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  notification,
} from "antd"
import { Provider, connect } from "react-redux"
import React, { Fragment, useEffect } from "react"
import {
  admitParticipant,
  clearErrors,
  getGrades,
  getParticipants,
  pickupParticipant,
  searchParticipant,
} from "../../actions/participantActions"

import EditParticipant from "./EditParticipant"
import ParticipantDescription from "./ParticipantDescription"
import PropTypes from "prop-types"
import { SearchOutlined } from "@ant-design/icons"
import storeConfig from "../../store"

const ParticipantTable = ({
  participant: { participantData, loading, error, success, grades },
  getParticipants,
  getGrades,
  admitParticipant,
  pickupParticipant,
  searchParticipant,
  clearErrors,
}) => {
  const { Option } = Select
  useEffect(() => {
    clearErrors()
    const fetchData = async () => {
      if (!participantData) {
        await getParticipants()
      }
      if (!grades) {
        await getGrades()
      }
    }
    fetchData()
    if (error) {
      errorNotification(error.message)
      clearErrors()
    }
    if (success) {
      successNotification(success.message)
    }
    // eslint-disable-next-line
  }, [error, success])
  const [form] = Form.useForm()
  const { store } = storeConfig
  const { Search } = Input

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      fixed: "left",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
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
      render: record => (
        <span>
          <Button
            type="link"
            onClick={() => handleParticipantAdmission(record)}
          >
            Admit
          </Button>
          <Button type="link" onClick={() => handleParticipantPickup(record)}>
            Pickup
          </Button>
        </span>
      ),
      fixed: "right",
    },
  ]

  const [isSearching, setIsSearching] = React.useState(false)
  const [admissionConfirmationLoading, setAdmissionConfirmationLoading] =
    React.useState(false)
  const [pickupConfirmationLoading, setPickupConfirmationLoading] =
    React.useState(false)
  const [searchClass, setSearchClass] = React.useState(null)
  const [pickupPerson, setPickupPerson] = React.useState(null)

  const handleAdmission = async record => {
    setAdmissionConfirmationLoading(true)
    await admitParticipant(record.id)
    setAdmissionConfirmationLoading(false)
  }

  const handlePickup = async record => {
    setPickupConfirmationLoading(true)
    await pickupParticipant(record.id)
    setPickupConfirmationLoading(false)
  }

  const handleParticipantAdmission = record => {
    Modal.confirm({
      title: "Confirm Attendance",
      content: (
        <span>
          Confirm attendance of{" "}
          <strong>
            {record.first_name} {record.last_name}
          </strong>{" "}
          for today{" "}
          {Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(
            new Date()
          )}
        </span>
      ),
      okText: "Confirm",
      confirmLoading: admissionConfirmationLoading,
      onOk: () => {
        handleAdmission(record)
      },
    })
  }

  const handleParticipantPickup = record => {
    Modal.confirm({
      title: "Confirm Pickup",
      destroyOnClose: true,
      content: (
        <>
          <span>
            Confirm pickup of{" "}
            <strong>
              {record.first_name} {record.last_name}
            </strong>{" "}
            for today{" "}
            {Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(
              new Date()
            )}
          </span>
          {/* <Input
            style={{ marginTop: "20px" }}
            placeholder="Pickup Person Name"
            required={true}
            onChange={e => setPickupPerson(e.target.value)}
          /> */}
        </>
      ),
      okText: "Confirm",
      confirmLoading: pickupConfirmationLoading,
      onOk: () => {
        handlePickup(record)
      },
    })
  }

  const onSearch = async (value, event) => {
    setIsSearching(true)
    await searchParticipant(value, searchClass)
    setIsSearching(false)
  }

  const errorNotification = message => {
    notification.error({
      message: "Oops",
      description: message,
    })
  }

  const successNotification = message => {
    notification.success({
      message: "Awesome!",
      description: message,
    })
  }

  if (loading || !participantData || !grades) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "200px" }} />
    )
  }

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <Card style={{ marginBottom: "200px" }}>
            <Row style={{ marginBottom: "20px" }} gutter={8}>
              <Col span={8}>
                <Select
                  defaultValue="Class"
                  style={{
                    display: "inline-block",
                    width: "calc(100%)",
                  }}
                  onChange={value => setSearchClass(value)}
                >
                  {grades.map(grade => (
                    <Option key={grade.name} value={grade.name}>
                      {grade.name}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={16}>
                <Search
                  prefix={<SearchOutlined />}
                  placeholder="Search for participant by first name or last name or pickup code."
                  allowClear
                  loading={isSearching}
                  enterButton="Search"
                  onSearch={onSearch}
                />
              </Col>
            </Row>
            <Table
              columns={columns}
              dataSource={participantData.results.map(record => ({
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
              loading={loading || participantData === null}
              scroll={{ x: 1000 }}
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

ParticipantTable.propTypes = {
  participant: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  getParticipants: PropTypes.func.isRequired,
  getGrades: PropTypes.func.isRequired,
  searchParticipant: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  participant: state.participant,
  admin: state.admin,
})

export default connect(mapStateToProps, {
  getParticipants,
  getGrades,
  searchParticipant,
  admitParticipant,
  pickupParticipant,
  clearErrors,
})(ParticipantTable)
