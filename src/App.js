import { useState } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import SignIn from './containers/SignIn/SignIn';
import Register from './containers/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import './App.css';

const particlesOptions = {
	particles     : {
		number : {
			value   : 100,
			density : {
				enable     : true,
				value_area : 800,
			},
		},
	},
	interactivity : {
		detect_on : 'window',
		events    : {
			onhover : {
				enable : true,
				mode   : 'repulse',
			},
			resize  : true,
		},
	},
	retina_detect : true,
};

const initialState = {
	id      : '',
	name    : '',
	email   : '',
	entries : 0,
	joined  : '',
};
// Example url: https://www.publicbooks.org/wp-content/uploads/2019/11/joel-mott-LaK153ghdig-unsplash-scaled-e1574787737429-810x625.jpg
function App() {
	const [ input, setInput ] = useState('');
	const [ imageUrl, setImageUrl ] = useState('');
	const [ box, setBox ] = useState({});
	const [ route, setRoute ] = useState('signin');
	const [ isSignedIn, setIsSignedIn ] = useState(false);
	const [ user, setUser ] = useState(initialState);
	const [ currentEntries, setCurrentEntries ] = useState(0);

	const loadUser = (data) => {
		const { id, name, email, entries, joined } = data;
		setUser({
			id,
			name,
			email,
			entries,
			joined,
		});
		setCurrentEntries(entries);
	};

	const calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		// console.log(width, height);
		return {
			leftCol   : clarifaiFace.left_col * width,
			topRow    : clarifaiFace.top_row * height,
			rightCol  : width - clarifaiFace.right_col * width,
			bottomRow : height - clarifaiFace.bottom_row * height,
		};
	};

	const displayFaceBox = (box) => {
		setBox(box);
	};

	const onInputChange = (event) => {
		setInput(event.target.value);
	};

	const onPictureSubmit = () => {
		setImageUrl(input);
		fetch(`https://secure-retreat-70511.herokuapp.com/imageurl`, {
			method  : 'post',
			headers : { 'Content-Type': 'application/json' },
			body    : JSON.stringify({
				input : input,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response) {
					fetch(`https://secure-retreat-70511.herokuapp.com/image`, {
						method  : 'put',
						headers : { 'Content-Type': 'application/json' },
						body    : JSON.stringify({
							id : user.id,
						}),
					})
						.then((resp) => resp.json())
						.then((count) => {
							setUser(Object.assign(user, { entries: count }));
							setCurrentEntries(count);
						})
						.catch(console.log);
				}
				displayFaceBox(calculateFaceLocation(response));
			})
			.catch((err) => console.log(err));
	};

	const onRouteChange = (value) => {
		value === 'home' ? setIsSignedIn(true) : setIsSignedIn(false);
		setRoute(value);
		if (!isSignedIn) {
			setImageUrl('');
		}
	};

	return (
		<div className="App">
			<Particles className="particles" params={particlesOptions} />
			<Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
			{route === 'home' ? (
				<div>
					<Logo />
					<Rank name={user.name} entries={currentEntries} />
					<ImageLinkForm onInputChange={onInputChange} onPictureSubmit={onPictureSubmit} />
					<FaceRecognition box={box} imageUrl={imageUrl} />
				</div>
			) : route === 'register' ? (
				<Register onRouteChange={onRouteChange} loadUser={loadUser} />
			) : (
				<SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
			)}
		</div>
	);
}

export default App;
