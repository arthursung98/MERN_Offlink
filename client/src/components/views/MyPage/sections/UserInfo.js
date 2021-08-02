import React from 'react'
import { Descriptions, Divider, Typography } from 'antd'

function UserInfo(props) {
    let userInfo = props.userInfo;

    return (
        <div style={{ fontFamily: "Quicksand" }}>
            <div style={{ paddingLeft: '3vw' }}>
                <Typography.Title style={{ marginBottom: '0' }}>{userInfo.name}</Typography.Title>
                <Typography.Title level={4} style={{ marginTop: '0' }}>
                    @ {userInfo.username}
                </Typography.Title>
                <Typography.Title level={3} style={{ marginTop: '0', color: "#18aaff" }}>
                    {userInfo.job_title} at {userInfo.company_name}
                </Typography.Title>
            </div>
            <Divider />
            <div style={{ width: '50%', float: 'left' }}>
                <div style={{ fontSize: '19px', fontWeight: 'bold', marginBottom: '20px' }}>Contact Information</div>
                <Descriptions>
                    <Descriptions.Item label="Phone" span={6}>{userInfo.phone_number}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={6}>{userInfo.email}</Descriptions.Item>
                    <Descriptions.Item label="Address" span={6}></Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    )
}

export default UserInfo
