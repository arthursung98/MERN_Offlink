import React from 'react'
import './Footer.less'
import { Icon, Row, Col, Divider } from 'antd';

function Footer() {
  return (
    <div className="footer">
      <div className="footer_nav">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ fontSize:'16px',fontWeight:'bold' }}>
          <Col className="gutter_row" span={8}>
            Explore
          </Col>
          <Col className="gutter_row" span={8}>
            My Account
          </Col>
          <Col className="gutter_row" span={8}>
            Link
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter_row" span={8}>
            <a href="/">Home</a>
          </Col>
          <Col className="gutter_row" span={8}>
            <a href="/register">Sign Up</a>
          </Col>
          <Col className="gutter_row" span={8}>
            Make a Link
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter_row" span={8}>
            About
          </Col>
          <Col className="gutter_row" span={8}>
            <a href="/login">Log In</a>
          </Col>
          <Col className="gutter_row" span={8}>
            Explore Links
          </Col>
        </Row>
      </div>
      <div className="footer_divider">
        <Divider />
      </div>
      <div className="footer_contact">
        <Icon type="linkedin" className="icon"/>
        <a href="//linkedin.com/in/arthursung23" style={{paddingLeft:'5px', marginRight:'15px'}}>LinkedIn</a>
        <Icon type="github" className="icon"/>
        <a href="//github.com/arthursung98" style={{paddingLeft:'5px', marginRight:'15px'}}>Github</a>
        <Icon type="mail" className="icon"/>
        <a href="//arthursung98@gmail.com" style={{paddingLeft:'5px', marginRight:'15px'}}>Email</a>
      </div>
      <div className="footer_copyright">
        <Icon type="copyright" className="icon_white"/>
        2021 Arthur Sung. All rights reserved.
      </div>
    </div>
  )
}

export default Footer
