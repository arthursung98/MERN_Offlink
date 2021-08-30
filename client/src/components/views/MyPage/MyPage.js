import React, { useEffect, useState } from 'react';
import UserInfo from './sections/UserInfo';
import WorkInfo from './sections/WorkInfo';
import Axios from 'axios';
import { USER_SERVER } from '../../Config';
import avatar from '../../../images/headshot.jpg';
import './MyPage.less'
import { Divider } from 'antd';

function MyPage() {
	const [FirstName, setFirstName] = useState("");
	const [LastName, setLastName] = useState("");
	const [PhoneNumber, setPhoneNumber] = useState("");
	const [Email, setEmail] = useState("");
	const [Username, setUsername] = useState("");
	const [JobTitle, setJobTitle] = useState("");
	const [CompanyName, setCompanyName] = useState("");
	const [Company_Lat, setCompany_Lat] = useState(0.0);
	const [Company_Lng, setCompany_Lng] = useState(0.0);
	const [Address, setAddress] = useState("");
	const [City, setCity] = useState("");
	const [State, setState] = useState("");
	const [Zipcode, setZipcode] = useState("");

	useEffect(() => {
		Axios.get(`${USER_SERVER}/auth`)
			.then(response => {
				if (response.status === 200) {
					setFirstName(response.data.firstname);
					setLastName(response.data.lastnadme);
					setPhoneNumber(response.data.phone_number);
					setEmail(response.data.email);
					setUsername(response.data.username);
					setJobTitle(response.data.job_title);
					setCompanyName(response.data.company_name);
					setCompany_Lat(response.data.company_lat);
					setCompany_Lng(response.data.company_lng);
					setAddress(response.data.address);
					setCity(response.data.city);
					setState(response.data.state);
					setZipcode(response.data.zipcode);
				} else {
					alert("Failed to get user information for My Page")
				}
			})
	}, [])

	return (
		<div className="app">
			<div className="mypage_container">
				<div className="mypage_left">
					<img src={avatar} className="profile_pic" />
					<Divider style={{ marginBottom: "12px" }}>Work</Divider>
					<WorkInfo
						company_name={CompanyName}
						company_lat={Company_Lat}
						company_lng={Company_Lng}
						address={Address}
						city={City}
						state={State}
						zipcode={Zipcode}
					/>
				</div>

				<div className="mypage_right">
					<UserInfo
						firstname={FirstName}
						lastname={LastName}
						phone_number={PhoneNumber}
						email={Email}
						username={Username}
						job_title={JobTitle}
					/>
				</div>
			</div>
		</div>
	)
}

export default MyPage