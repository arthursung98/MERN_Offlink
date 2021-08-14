import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import { Form, Input, Steps, Button } from 'antd'
const { Step } = Steps;

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
			offset: 9,
		},
	},
};

function RegisterPage3(props) {
	const dispatch = useDispatch();
	const firstPage = props.location.pageOneInfo;
	const secondPage = props.location.pageTwoInfo;

	return (
		<Formik
			onSubmit={(value, { setSubmitting }) => {
				setTimeout(() => {
					let info = {
						firstname: firstPage.firstname,
						lastname: firstPage.lastname,
						phone_number: firstPage.phone_number,
						email: firstPage.email,
						username: firstPage.username,
						password: firstPage.password,
						work_info_submitted: secondPage.work_info_submitted,
						job_title: secondPage.job_title,
						company_name: secondPage.company_name,
						company_lat: secondPage.company_lat,
						company_lng: secondPage.company_lng,
						address: secondPage.address,
						city: secondPage.city,
						state: secondPage.state,
						zipcode: secondPage.zipcode
					};

					dispatch(registerUser(info))
						.then(response => {
							if(response.payload.registerSuccess) {
								alert("Sign Up success. Please Log In.");
								props.history.push("/login");
							} else {
								alert(response.payload.err.errmsg);
							}
						})

					setSubmitting(false);
				}, 500);
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
						<Steps current={2} style={{ width: '50%', minWidth: '500px', maxWidth: '650px' }}>
							<Step
								title="Page 1 of 3"
								description="User Information" />
							<Step
								title="Page 2 of 3"
								description="Work Information" />
							<Step
								title="Page 3 of 3"
								description="Interest Groups">
							</Step>
						</Steps>

						<Form>
							<Form.Item {...tailFormItemLayout}>
								<Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</div>
				)
			}}
		</Formik>
	)
}

export default RegisterPage3