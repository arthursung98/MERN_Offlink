import React from 'react';
// Pages for this product
import LinkNav from './sections/LinkNav';
import Event from './sections/Event';
import './Link.less';

function LinkMain() {
	return (
		<div className="app">
			<div className="link_container">
				<LinkNav />
				<Event />
			</div>
		</div>
	)
}

export default LinkMain
