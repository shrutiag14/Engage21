import React from 'react';
import ReactModal from 'react-modal';
import { auth, database } from '../firebase/firebase';
import Background from './Background';
import DispalyAssigment from './DispalyAssigment'

import '../styles/Announcements.css';

class SubmitAssigmetn extends React.Component {

	constructor() {
		super();

		this.state = {
			allAssigment: [],
			dbSubjectKey: '',
			subjectName: '',
			subjectCode: '',
			userType: '',
			showModal: false,
			allAssigment: []
		}

	}

	componentDidMount() {
		let allAssigment = [];
		let authh;
		auth.onAuthStateChanged((user) => {
			if (user) {
				console.log("Logged In");
				authh = auth.currentUser.uid;
				console.log(authh);
			}
		});



		database
			.collection("assigment")
			.get()

			.then(subjects => {
				subjects.forEach(subject => {
					allAssigment.push({ ...subject.data() });
				});
				allAssigment.reverse();

				this.setState({ allAssigment });
				allAssigment = [];

			});

	}


	displayAssigment() {
		console.log(this.state.allAssigment)
		return this.state.allAssigment.map((announcement, index) => {
			return (
				<DispalyAssigment
					title={announcement.assignmentNumber}
					description={announcement.announcement}
					key={index}
					index={index}
					lastDate={announcement.submissionDate}
					assigment={announcement.announcement}


				/>
			);
		});
	}

	render() {

		return (
			<div id="announcements-page">
				{/* <Background /> */}
				<div className="announcements">
					{this.displayAssigment()}

					<div className="new-announcement-div">

					</div>
				</div>
			</div>
		);
	}
}

export default SubmitAssigmetn;
