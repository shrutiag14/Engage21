import React from 'react';
import {auth, database } from '../firebase/firebase';
import Header from './Header';
import LectureNotees from './LectureNotees';
import '../styles/StudyMaterials.css';
import Notes from './Notes';



class StudyMaterials extends React.Component {

	constructor() {
		super();

		this.state = {
			isTeacher: false,
			isStudent: false,
		
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
			else{
				this.setState({isStudent: true});
			}
		}
			}
			)
			
		});
		
	}
	render() {
		console.log('teacher',this.state.isTeacher); 
		console.log('student',this.state.isStudent); 
		return (
			<div id="study-materials-page">
				<div className="study-materials">
					<Header />
					{this.state.isStudent && <Notes/>}

					
					{this.state.isTeacher &&<LectureNotees isTeacher={this.state.isTeacher}  />}

				</div>
			</div>
		)
	}
}

export default StudyMaterials;
