import React from 'react';
import ReactModal from 'react-modal';
import { history } from '../routes/AppRouter';
import {auth, database} from '../firebase/firebase';
import AllSubjects from './AllSubjects';
import '../styles/HomePage.css';


class HomePage extends React.Component {

	constructor() {
		super();

		this.state = {
			addSubjectModal: false,
			
		};

		this.addSubject = this.addSubject.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.addSubjectHandler = this.addSubjectHandler.bind(this);
	}

	handleOpenModal() {
		this.setState({ addSubjectModal: true });
	}

	handleCloseModal() {
		this.setState({ addSubjectModal: false });
	}

	addSubjectHandler() {
		console.log('sdffds')
		this.handleOpenModal();
	}
	

	addSubject(event) {
		event.preventDefault();

		const { dbUserKey } = this.props;
		const subjectName = this.refs.subjectName.value;
		const subjectCode = this.refs.subjectCode.value;
		const instructorName = this.refs.instructorName.value;

		
			database.collection('subjects').add({
				subjectName: subjectName,
				subjectCode: subjectCode,
				instructorName: instructorName
			})
			console.log('add subjects')
	
		this.handleCloseModal();
	}

	logout() {
		auth.signOut().then(() => {
			history.push('/');
		}).catch((error) => {
			console.log(error);
		});
	}
	render() {
		return (

			<div id="home-page">

				<div className="home">
					<div className="home-page-header">
					    
						<span className="home-page-header-title">Your Subjects</span>
						<button className="logout-button" onClick={this.logout}>Logout</button>
						<button className="back-button" onClick={this.back}>Back</button>
						<button className="home-button" onClick={this.home}>Home</button>
					</div>
					
					<div 
					style={{display:'relative'}}
					>
						<AllSubjects />
					
					<div className="add-subject-div"
					onClick={this.addSubjectHandler}
					>

						<div className="add-subject-div-button">+</div>
						<div className="add-subject-label">Add Subject</div>
						
					</div>
					</div>
					
					<ReactModal isOpen={this.state.addSubjectModal} contentLabel="Add Announcement" ariaHideApp=  {false} className="add-subject-modal">
						<form className="add-subject-form" onSubmit={this.addSubject}>
							<div>Subject Name</div>
							<input type="text" className="new-subject-name" ref="subjectName" required />
							<div>Subject Code</div>
							<input type="text" className="new-subject-code" ref="subjectCode" required />
							<div>Instructor Name</div>
							<input type="text" className="new-instructor-name" ref="instructorName" required />
							<br />
							<input type="submit" value="Add Subject" className="add-subject-button" />
							<button onClick={this.handleCloseModal} className="close-modal-button">Cancel</button>
						</form>
					</ReactModal>
				</div>
			</div>
		);
	}
}

export default HomePage;
