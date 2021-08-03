import React from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Input, Button, Steps, Select} from 'antd';
const { Step } = Steps;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 10,
    },
  },
};
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="1">+1</Option>
    </Select>
  </Form.Item>
);

function RegisterPage(props) {
  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        phone_number: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={yup.object().shape({
        firstname: yup.string().required('First Name is required'),
        lastname: yup.string().required('Last Name is required'),
        phone_number: yup.string().required('Phone is required'),
        username: yup.string().required('Username is required'),
        email: yup.string().email('Email is invalid').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values) => {
        props.history.push({
          pathname: "/register2",
          state: values
        });
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <div className="app">
            <Steps current={0} style={{ width: '50%', minWidth: '600px' }}>
              <Step
                title="Page 1 of 3"
                description="User Information" />
              <Step
                title="Page 2 of 3"
                description="Job Information" />
              <Step
                title="Page 3 of 3"
                description="Interest Groups">
              </Step>
            </Steps>
            <br />
            <br />
            <Form style={{ minWidth: '375px', paddingRight: '5%' }} {...formItemLayout} onSubmit={handleSubmit} >
              <Form.Item required label="First Name">
                <Input
                  id="firstname"
                  placeholder="Enter your first name"
                  type="text"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.firstname && touched.firstname ? 'text-input error' : 'text-input'
                  }
                />
                {errors.firstname && touched.firstname && (
                  <div className="input-feedback">{errors.firstname}</div>
                )}
              </Form.Item>

              <Form.Item required label="Last Name">
                <Input
                  id="lastname"
                  placeholder="Enter your last name"
                  type="text"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastname && touched.lastname ? 'text-input error' : 'text-input'
                  }
                />
                {errors.lastname && touched.lastname && (
                  <div className="input-feedback">{errors.lastname}</div>
                )}
              </Form.Item>

              <Form.Item required label="Phone #">
                <Input
                  id="phone_number"
                  placeholder="Enter your Phone number"
                  type="text"
                  value={values.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.phone_number && touched.phone_number ? 'text-input error' : 'text-input'
                  }
                />
                {errors.phone_number && touched.phone_number && (
                  <div className="input-feedback">{errors.phone_number}</div>
                )}
              </Form.Item>

              <Form.Item required label="Username">
                <Input
                  id="username"
                  placeholder="Enter your Username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.username && touched.username ? 'text-input error' : 'text-input'
                  }
                />
                {errors.username && touched.username && (
                  <div className="input-feedback">{errors.username}</div>
                )}
              </Form.Item>

              <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="Confirm" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm your Password"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Next
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage