import React from 'react';
import { Form, Input, Button } from 'antd';
import {
    InfoWindow,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import Geocode from 'react-geocode';
import AutoComplete from 'react-google-autocomplete';

Geocode.setApiKey("AIzaSyBgLRLxUV14Slgd1QfMwCUNMhHOOdBgQbc");

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

class MyPage extends React.Component {
    state = {
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

    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng)
            .then(response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    state = this.getState(addressArray);

                this.setState({
                    address: (address) ? address : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    }
                })
            })
    }

    onPlaceSelected = (place) => {
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            state = this.getState(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();

        this.setState({
            address: (address) ? address : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
            markerPosition: {
                lat: latValue,
                lng: lngValue
            }
        })
    }


    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            >
                <Marker
                    draggable={true}
                    onDragEnd={this.onMarkerDragEnd}
                    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }} >
                    <InfoWindow>
                        <div>Hello</div>
                    </InfoWindow>
                </Marker>

                <AutoComplete
                    style={{
                        width: '100%',
                        height: '40px',
                        marginTop: 2,

                    }}
                    types={['(regions)']}
                    onPlaceSelected={this.onPlaceSelected}
                />
            </GoogleMap>
        ));

        return (
            <div style={{
                alignItems: 'center', paddingTop: '30px',
                textAlign: 'center'
            }}>
                My Page

                <div className="mypage_container"
                    style={{ marginTop: '5vh', width: '100%', height: '80vh' }}>
                    <div className="mypage_userinfo"
                        style={{
                            height: '70vh',
                            width: '40%',
                            float: 'left',
                            textAlign: 'center',
                            alignItems: 'center'
                        }}>

                        <Form {...formItemLayout}>
                            <Form.Item style={{}} label="Email">
                                <Input
                                    id="email"
                                    placeholder=""
                                    type="text"
                                />
                            </Form.Item>
                        </Form>
                    </div>

                    <div className="google_map"
                        style={{
                            float: 'right',
                            alignItems: 'center',
                            width: '50%'
                        }}>
                        <MapWithAMarker
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgLRLxUV14Slgd1QfMwCUNMhHOOdBgQbc&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ width: `50%`, height: `400px`, margin: 'auto' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default MyPage