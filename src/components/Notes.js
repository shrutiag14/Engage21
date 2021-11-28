import React from 'react';
import ReactModal from 'react-modal';
import {auth, database } from '../firebase/firebase';
import { history } from '../routes/AppRouter';
import DisplayNotes from './DisplayNotes';
import Background from './Background';
import Header from './Header';
import Announcement from './Announcement';
import '../styles/Announcements.css';

class Notes extends React.Component {

	constructor() {
		super();

		this.state = {
			dbSubjectKey: '',
			subjectName: '',
			subjectCode: '',
			userType: '',
			showModal: false,
			allNotes:[]
			
		}

		this.displayNotes = this.displayNotes.bind(this);
		
	}


	componentDidMount() {
		let allNotes=[];
		let authh;
		auth.onAuthStateChanged((user) => 
        {
			if (user)
             {
				console.log("Logged In");
				authh = auth.currentUser.uid;
				console.log(authh);
			}
		});
    
		database
			.collection("blogs")
			.get()

			.then(subjects => {
				
				subjects.forEach(subject => {
					allNotes.push({ ...subject.data() });
				});
				allNotes.reverse();

				this.setState({ allNotes });
				allNotes = [];
			});
        }

displayNotes() {
		console.log(this.state.allNotes)
		return this.state.allNotes.map((note, index) => {
			return (
				<DisplayNotes
					title = {note.title}
					subject = {note.notes}
					key ={index}
				/>
			);
		});
	}

	render() {
		return (
			<div id="announcements-page">
				<div className="announcements">
					<div>
                    {this.displayNotes()}

                    </div>
				</div>
			</div>
		);
	}
}

export default Notes;
