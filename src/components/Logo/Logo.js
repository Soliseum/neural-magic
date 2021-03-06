import React from 'react';
import Tilt from 'react-tilt';

import cpu from './cpu.svg';
import './Logo.css';

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt className="Tilt br3 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }}>
				<div className="Tilt-inner pa3">
					<img src={cpu} style={{ paddingTop: '5px' }} alt="CPU Logo" />
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;
