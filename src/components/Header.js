import React from 'react';
import { history } from '../routes/AppRouter';
import {auth} from '../firebase/firebase';
import '../styles/Header.css';

const Header =()=>{

	const goBack=()=> {
		history.goBack();
	}

	const goHome=()=> {
		history.push('/homepage');
	}

	const logout=()=> {
		auth.signOut().then(() => {
			history.push('/');
		}).catch((error) => {
			console.log(error);
		});
	}

	
		return (
			<div className="header">

			
				<button  className="back-button" onClick={goBack}>Back</button>
				<button className="home-button" onClick={goHome}>Home</button>
				<button className="logout-button" onClick={logout}>Logout</button>
			
			</div>
		);
	
}

export default Header;
