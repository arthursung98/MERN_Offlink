import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { USER_SERVER } from '../../../Config';
import '../Link.less';
import { Typography, Button, Alert } from 'antd'


function LinkNav(props) {
	const [onClickHandler, setonClickHandler] = useState('');


	useEffect(() => {
		Axios.get(`${USER_SERVER}/auth`)
			.then(response => {
				if (response.status === 200) {
					console.log('Success');

				} else {
					alert('Log In First!');
					props.history.push("/login");
				}
			})
	}, [])

	return (
		<div className="link_nav">
			<Typography.Title style={{ float: 'left' }}>
				<a href="/link">Events</a>
			</Typography.Title>
			<Button 
				type="primary" 
				style={{ float: 'right', marginTop: '15px' }}
				// onClick={alert('Clicked!')}
				>
					Make A New Link
				</Button>
		</div>
	)
}

export default LinkNav
