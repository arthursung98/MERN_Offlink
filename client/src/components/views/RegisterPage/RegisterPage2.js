import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import AutoComplete from 'react-google-autocomplete';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";
import { MAPS_API_KEY } from '../../Config';
import { Formik } from 'formik';
import * as yup from 'yup';
import './RegisterPage.less';
import { Form, Input, Steps, Button, Typography } from 'antd';

const { Step } = Steps;

Geocode.setApiKey(MAPS_API_KEY);

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

function RegisterPage2(props) {
	const userInfo = props.location.state;
	// States
	const [Address, setAddress] = useState("");
	const [City, setCity] = useState("");
	const [State, setState] = useState("");
	const [Zipcode, setZipcode] = useState(0);
	const [MapLat, setMapLat] = useState(0);
	const [MapLng, setMapLng] = useState(0);
	const [MarkerLat, setMarkerLat] = useState(0);
	const [MarkerLng, setMarkerLng] = useState(0);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				var currentLat = position.coords.latitude;
				var currentLng = position.coords.longitude;

				Geocode.fromLatLng(currentLat, currentLng)
					.then(response => {
						const addressArray = response.results[0].address_components;

						setAddress(getAddress(addressArray));
						setCity(getCity(addressArray));
						setState(getState(addressArray));
						setZipcode(getZipcode(addressArray));
						setMapLat(currentLat);
						setMapLng(currentLng);
						setMarkerLat(currentLat);
						setMarkerLng(currentLng);
					})
			})
		}
	}, [])

	const MapWithAMarker = withScriptjs(withGoogleMap(props =>
		<GoogleMap
			defaultZoom={13}
			defaultCenter={{ lat: MapLat, lng: MapLng }}
		>
			<Marker
				draggable={true}
				onDragEnd={onMarkerDragEnd}
				position={{ lat: MarkerLat, lng: MarkerLng }}>
			</Marker>
			<AutoComplete
				style={{
					width: '100%',
					height: '40px',
					marginTop: '10px',
				}}
				types={['(regions)']}
				onPlaceSelected={onPlaceSelected}
			/>
		</GoogleMap>
	));

	function onPlaceSelected(place) {
		const addressArray = place.address_components,
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();

		setAddress(getAddress(addressArray));
		setCity(getCity(addressArray));
		setState(getState(addressArray));
		setZipcode(getZipcode(addressArray));
		setMapLat(latValue);
		setMapLng(lngValue);
		setMarkerLat(latValue);
		setMarkerLng(lngValue);
	}

	function onMarkerDragEnd(event) {
		let newLat = event.latLng.lat();
		let newLng = event.latLng.lng();

		Geocode.fromLatLng(newLat, newLng)
			.then(response => {
				const addressArray = response.results[0].address_components;

				setAddress(getAddress(addressArray));
				setCity(getCity(addressArray));
				setState(getState(addressArray));
				setZipcode(getZipcode(addressArray));
				setMapLat(newLat);
				setMapLng(newLng);
				setMarkerLat(newLat);
				setMarkerLng(newLng);
				console.log(response);
			})
	}

	function getAddress(addressArray) {
		let address = '';

		for (let index = 0; index < addressArray.length; index++) {
			if (addressArray[index].types[0] && 'street_number' === addressArray[index].types[0]) {
				address += addressArray[index].long_name + ' ';
			}
			if (addressArray[index].types[0] && 'route' === addressArray[index].types[0]) {
				address += addressArray[index].long_name;
			}
		}
		return address;
	}
	function getCity(addressArray) {
		let city = '';

		for (let index = 0; index < addressArray.length; index++) {
			if (addressArray[index].types[0] && 'locality' === addressArray[index].types[0]) {
				city = addressArray[index].long_name;
				return city;
			}
		}
	}
	function getState(addressArray) {
		let state = '';

		for (let index = 0; index < addressArray.length; index++) {
			if (addressArray[index].types[0] && 'administrative_area_level_1' === addressArray[index].types[0]) {
				state = addressArray[index].long_name;
				return state;
			}
		}
	}
	function getZipcode(addressArray) {
		let zipcode = '';

		for (let index = 0; index < addressArray.length; index++) {
			if (addressArray[index].types[0] && 'postal_code' === addressArray[index].types[0]) {
				zipcode = addressArray[index].long_name;
				return zipcode;
			}
		}
	}

	return (
		<Formik
			initialValues={{
				company_name: '',
				job_title: '',
				address: '',
				city: '',
				state: '',
				zipcode: ''
			}}
			validationSchema={yup.object().shape({
				company_name: yup.string().required('Company Name is required'),
				job_title: yup.string().required('Job Title is required'),
				address: yup.string().required('Address is required'),
				zipcode: yup.string().required('Zipcode is required')
					.min(5, 'Zipcode must be 5 digits')
			})}
			onSubmit={(value => {
				let pageTwoInfo = {
					work_info_submitted: true,
					job_title: value.job_title,
					company_name: value.company_name,
					company_lat: MarkerLat,
					company_lng: MarkerLng,
					address: value.address,
					city: City,
					state: State,
					zipcode: value.zipcode
				};

				props.history.push({
					pathname: "/register3",
					pageOneInfo: userInfo,
					pageTwoInfo: pageTwoInfo
				})
			})}
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
						<Steps current={1} style={{ width: '50%', minWidth: '500px', maxWidth: '650px' }}>
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
						<br />
						<br />
						<div className="register">
							<div className="register_form">
								<Form 
									style={{ minWidth: '375px', paddingRight: '5%'}}
									onSubmit={handleSubmit}
									{...formItemLayout} >
								<Typography.Title
									level={4}
									style={{ paddingLeft: '20%', marginBottom: '20px' }}>
									Company Information
								</Typography.Title>

									<Form.Item required label="Company Name">
										<Input
											id="company_name"
											placeholder="Enter your Company Name"
											type="text"
											value={values.company_name}
											onChange={handleChange}
											onBlur={handleBlur}
											className={
												errors.company_name && touched.company_name ? 'text-input error' : 'text-input'
											}
										/>
										{errors.company_name && touched.company_name && (
											<div className="input-feedback">{errors.company_name}</div>
										)}
									</Form.Item>

									<Form.Item required label="Job Title">
										<Input
											id="job_title"
											placeholder="Enter your Job Title"
											type="text"
											value={values.job_title}
											onChange={handleChange}
											onBlur={handleBlur}
											className={
												errors.job_title && touched.job_title ? 'text-input error' : 'text-input'
											}
										/>
										{errors.job_title && touched.job_title && (
											<div className="input-feedback">{errors.job_title}</div>
										)}
									</Form.Item>

									<Typography.Title
										level={4}
										style={{ paddingLeft: '15%', marginBottom: '20px' }}>
										Company Location
									</Typography.Title>

									<Form.Item required label="Address">
										<Input
											id="address"
											placeholder={Address}
											type="text"
											value={values.address}
											onChange={handleChange}
											onBlur={handleBlur}
											className={
												errors.address && touched.address ? 'text-input error' : 'text-input'
											}
										/>
										{errors.address && touched.address && (
											<div className="input-feedback">{errors.address}</div>
										)}
									</Form.Item>

									<Form.Item required label="City">
										<Input
											id="city"
											placeholder=""
											type="text"
											value={City}
											onChange={handleChange}
											onBlur={handleBlur}
											className={
												errors.city && touched.city ? 'text-input error' : 'text-input'
											}
										/>
										{errors.city && touched.city && (
											<div className="input-feedback">{errors.city}</div>
										)}
									</Form.Item>

									<Form.Item required label="State">
										<Input
											id="state"
											placeholder=""
											type="text"
											value={State}
											onChange={handleChange}
											onBlur={handleBlur}
											className={
												errors.state && touched.state ? 'text-input error' : 'text-input'
											}
										/>
										{errors.state && touched.state && (
											<div className="input-feedback">{errors.state}</div>
										)}
									</Form.Item>

									<Form.Item required label="Zipcode">
										<Input
											id="zipcode"
											placeholder={Zipcode}
											type="text"
											value={values.zipcode}
											onChange={handleChange}
											onBlur={handleBlur}
											className={
												errors.zipcode && touched.zipcode ? 'text-input error' : 'text-input'
											}
										/>
										{errors.zipcode && touched.zipcode && (
											<div className="input-feedback">{errors.zipcode}</div>
										)}
									</Form.Item>

									<Form.Item {...tailFormItemLayout}>
										<Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
											Next
										</Button>
									</Form.Item>
								</Form>
							</div>

							<div className="register_map">
								<MapWithAMarker
									googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
									loadingElement={<div style={{ height: `100%` }} />}
									containerElement={<div style={{ width: `100%`, height: `350px` }} />}
									mapElement={<div style={{ height: `100%` }} />}
								/>
							</div>
						</div>
					</div>
				)
			}}
		</Formik>
	)
}

export default RegisterPage2