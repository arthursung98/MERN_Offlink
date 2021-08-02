import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import Geocode from 'react-geocode';
import AutoComplete from 'react-google-autocomplete';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";
import { Formik } from 'formik';
import * as yup from 'yup'
import { Form, Input, Steps, Button } from 'antd';
import { MAPS_API_KEY } from '../../Config';

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
			offset: 10,
		},
	},
};

function RegisterPage2(props) {
	const userInfo = props.location.state;
	const dispatch = useDispatch();
	// States
	const [Email, setEmail] = useState(userInfo.email);
	const [Address, setAddress] = useState("");
	const [City, setCity] = useState("");
	const [State, setState] = useState("");
	const [MapLat, setMapLat] = useState(0);
	const [MapLng, setMapLng] = useState(0);
	const [MarkerLat, setMarkerLat] = useState(0);
	const [MarkerLng, setMarkerLng] = useState(0);
	

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				var currentLat = position.coords.latitude;
				var currentLng = position.coords.longitude;

				setMapLat(currentLat);
				setMapLng(currentLng);
				setMarkerLat(currentLat);
				setMarkerLng(currentLng);

				Geocode.fromLatLng(currentLat, currentLng)
				.then(response => {
					const address = response.results[0].formatted_address,
						addressArray = response.results[0].address_components,
						city = getCity(addressArray),
						state = getState(addressArray);

					(address) ? setAddress(address) : setAddress('');
					(city) ? setCity(city) : setCity(''); 
					(state) ? setState(state) : setState('');
				})
			})
		}
	})

	const MapWithAMarker = withScriptjs(withGoogleMap(props =>
		<GoogleMap
			defaultZoom={11}
			defaultCenter={{ lat: MapLat, lng: MapLng }}
		>
			<Marker
				position={{ lat: MarkerLat, lng: MarkerLng }} >
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
		const address = place.formatted_address,
			addressArray = place.address_components,
			city = getCity(addressArray),
			state = getState(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();

			setAddress(address);
			setCity(city);
			setState(state);
			(latValue) ? setMapLat(latValue) : setMapLat(0);
			(lngValue) ? setMapLng(lngValue) : setMapLng(0);
			(latValue) ? setMarkerLat(latValue) : setMarkerLat(0);
			(lngValue) ? setMarkerLng(lngValue) : setMarkerLng(0);

		console.log(Address);
		console.log(City);
		console.log(State);
	}

	function getCity(addressArray) {
		let city = '';

		for (let index = 0; index < addressArray.length; index++) {
			if (addressArray[index].types[0] && 'administrative_area_level_2' === addressArray[index].types[0]) {
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

	return (
		<Formik
			initialValues={{
				address: '',
				city: '',
				state: '',
				zipcode: ''
			}}
			validationSchema={yup.object().shape({
				address: yup.string().required('Address is required'),
				city: yup.string().required('City is required'),
				state: yup.string().required('State is required'),
				zipcode: yup.number().required('Zipcode is required')
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					let dataToSubmit = {
						// 	email: userInfo.email,
						// 	password: userInfo.password,
						// 	username: userInfo.username,
						work_info_submitted: true,
						company_lat: MarkerLat,
						company_lng: MarkerLng,
						address: values.address,
						city: values.city,
						state: values.state,
						zipcode: values.zipcode
					};

					dispatch(registerUser(dataToSubmit)).then(response => {
						if (response.payload.registerSuccess) {
							this.props.history.push("/login");
						} else {
							alert(response.payload.err.errmsg)
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
					<div className="app"
						style={{ height: '130vh' }}>
						<Steps current={1} style={{ width: '30%' }}>
							<Step
								title="Page 1 of 2"
								description="User Information" />
							<Step
								title="Page 2 of 2"
								description="Job Information" />
						</Steps>
						<br />
						<br />
						<Form style={{ minWidth: '375px', paddingRight: '5%' }}{...formItemLayout} onSubmit={handleSubmit} >
							<Form.Item required label="Address">
								<Input
									id="address"
									placeholder=""
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
									value={values.city}
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
									value={values.state}
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
									placeholder=""
									type="number"
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
									Submit
								</Button>
							</Form.Item>
						</Form>

						<MapWithAMarker
							googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
							loadingElement={<div style={{ height: `100%` }} />}
							containerElement={<div style={{ width: `40%`, height: `200px` }} />}
							mapElement={<div style={{ height: `100%` }} />}
						/>
					</div>
				)
			}}
		</Formik>
	)
}

export default RegisterPage2