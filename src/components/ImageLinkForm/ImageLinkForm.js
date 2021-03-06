import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
	return (
		<div>
			<p className="f3 black">{'Neural Magic will detect faces in your pictures. Give it a try!'}</p>
			<p className="f4 black-70">{'Please upload or link jpg files.'}</p>
			<div className="center">
				<div className="form center pa4 br3 shadow-5">
					<input className="f4 pa2 w-70 center b--white" type="text" onChange={onInputChange} />
					<button
						className="w-30 center grow br1 f4 link ph3 pv2 dib white bg-purple b--white"
						onClick={onPictureSubmit}
					>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageLinkForm;
