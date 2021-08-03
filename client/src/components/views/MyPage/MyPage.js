import React from 'react';
import './MyPage.less'
import { Divider } from 'antd';
import UserInfo from './sections/UserInfo';
import Axios from 'axios';
import Geocode from 'react-geocode';
import AutoComplete from 'react-google-autocomplete';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";
import { USER_SERVER, MAPS_API_KEY } from '../../Config';

Geocode.setApiKey(MAPS_API_KEY);

class MyPage extends React.Component {
	state = {
		userInfo: {},
		address: "",
		city: "",
		state: "",
		zoom: 15,
		mapPosition: {
			lat: 0,
			lng: 0
		},
		markerPosition: {
			lat: 0,
			lng: 0
		}
	}

	componentDidMount() {
		Axios.get(`${USER_SERVER}/auth`)
			.then(response => {
				if (response.status === 200) {
					this.setState({
						userInfo: response.data
					})
				} else {
					alert("Failed to get user information for My Page")
				}
			})

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				var currentLat = position.coords.latitude;
				var currentLng = position.coords.longitude;

				this.setState({
					mapPosition: {
						lat: currentLat,
						lng: currentLng
					},
					markerPosition: {
						lat: currentLat,
						lng: currentLng
					}
				}, () => {
					Geocode.fromLatLng(currentLat, currentLng)
						.then(response => {
							const address = response.results[0].formatted_address,
								addressArray = response.results[0].address_components,
								city = this.getCity(addressArray),
								state = this.getState(addressArray);

							this.setState({
								address: (address) ? address : '',
								city: (city) ? city : '',
								state: (state) ? state : ''
							})
						})
				})
			})
		}
	}

	getCity = (addressArray) => {
		let city = '';

		for (let index = 0; index < addressArray.length; index++) {
			if (addressArray[index].types[0] && 'administrative_area_level_2' === addressArray[index].types[0]) {
				city = addressArray[index].long_name;
				return city;
			}
		}
	}
	getState = (addressArray) => {
		let state = '';

		for (let index = 0; index < addressArray.length; index++) {
			if (addressArray[index].types[0] && 'administrative_area_level_1' === addressArray[index].types[0]) {
				state = addressArray[index].long_name;
				return state;
			}
		}
	}



	render() {
		const MapWithAMarker = withScriptjs(withGoogleMap(props =>
			<GoogleMap
				defaultZoom={13}
				defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
			>
				<Marker
					position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }} >
				</Marker>
			</GoogleMap>
		));

		return (
			<div className="mypage_container">
				<div className="mypage_left">
					<img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
						className="profile_pic" />
					<Divider>Interests</Divider>
				</div>

				<div className="mypage_right">
					<UserInfo
						userInfo={this.state.userInfo} />

					<div className="address_info">
						<MapWithAMarker
							googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
							loadingElement={<div style={{ height: `100%` }} />}
							containerElement={<div style={{ width: `40%`, height: `300px`, float: 'left' }} />}
							mapElement={<div style={{ height: `100%` }} />}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default MyPage