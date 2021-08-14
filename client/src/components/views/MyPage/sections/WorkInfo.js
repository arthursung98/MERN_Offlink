import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { MAPS_API_KEY } from '../../../Config';
import { Typography } from 'antd';

function WorkInfo(props) {
  const com_lat = props.company_lat;
  const com_lng = props.company_lng;

	const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: com_lat, lng: com_lng }}
    >
      <Marker
        position={{ lat: com_lat, lng: com_lng }} >
      </Marker>
    </GoogleMap>
  ));

	return (
		<div className="workinfo">
			<div style={{height:'56px'}}>
				<Typography.Title
					level={2}
					style={{ color: "#18aaff", float: 'left', marginTop: '0' }} >
					{props.company_name}
				</Typography.Title>
			</div>
			<div className="workinfo_address">
				{props.address}<br/>{props.city}, {props.state}, {props.zipcode}
			</div>
			<div className="workinfo_map">
				<MapWithAMarker
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ width: `100%`, height: `275px`}} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
			</div>
		</div>
	)
}

export default WorkInfo
