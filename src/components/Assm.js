import React from 'react';
import {auth, database } from '../firebase/firebase';
import Header from './Header';
import '../styles/StudyMaterials.css';
import Assignments from './Assignments'
import SubmitAssigmetn from './SubmitAssigmetn'
import DispalyDetails from './DispalyDetails'
class Assm extends React.Component {

	constructor() {
		super();

		this.state = {
			isTeacher: false
		};
	}

	componentDidMount() {

		let authh;
		auth.onAuthStateChanged((user) => {
			if (user) {
				console.log("Logged In");
				authh = auth.currentUser.uid;
				console.log(authh);
			}
		});

		database.collection('users').get()
		.then(users => {
			users.forEach(user=>{
				if(user.data().userUID===authh){
					if (user.data().userType === 'Teacher') {
						this.setState({ isTeacher: true });
			}
		}
			}
			)
			
		});
		
	}
	render() {
		return (
			<div id="study-materials-page">
				<div className="study-materials">
					<Header />
					{!this.state.isTeacher &&<SubmitAssigmetn/>}

					{this.state.isTeacher && <Assignments isTeacher={this.state.isTeacher}  />}
					{this.state.isTeacher && <DispalyDetails  />}
					
				
				</div>
			</div>
		)
	}
}

export default Assm;
