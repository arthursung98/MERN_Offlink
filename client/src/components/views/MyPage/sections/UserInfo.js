import React from 'react'
import { Descriptions, Divider, Typography } from 'antd'

function UserInfo(props) {
  return (
    <div>
      <div style={{ paddingLeft: '3vw' }}>
        <Typography.Title style={{ marginBottom: '0' }}>{props.firstname} {props.lastname}</Typography.Title>
        <Typography.Title level={4} style={{ marginTop: '0' }}>
          @{props.username}
        </Typography.Title>
        <Typography.Title level={3} style={{ marginTop: '0', color: "#18aaff" }}>
          {props.job_title}
        </Typography.Title>
      </div>
      <Divider />
      <div>
        <div className="contact_info">
          <div style={{ fontSize: '19px', fontWeight: 'bold', marginBottom: '20px' }}>Contact Information</div>
          <Descriptions>
            <Descriptions.Item label="Phone" span={6}>{props.phone_number}</Descriptions.Item>
            <Descriptions.Item label="Email" span={6}>{props.email}</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </div>
  )
}

export default UserInfo