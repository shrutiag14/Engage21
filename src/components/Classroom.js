import React from 'react';
import { history } from '../routes/AppRouter';
import {auth, database, } from '../firebase/firebase';
import '../styles/Classroom.css';
class Classroom extends React.Component {

	constructor() {
		super();

		auth.signOut();
	}

	render() {
		return (
			<div className="classroom">
				{/* <Background /> */}
				<img src='https://c0.wallpaperflare.com/preview/477/561/102/business-office-meetings-marketing.jpg' />
				<div className="classroom-login-signin">
					<button className="btn" onClick={() => history.push('/signin')}>Sign In</button>
				</div>
				<div className="classroom-login-signup">
					<button className="btn" onClick={() => history.push('/signup')}>Sign Up</button>
				</div>
			</div>
		);
	}
}

export default Classroom;
