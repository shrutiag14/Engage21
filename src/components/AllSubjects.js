import React from 'react';
import { history } from '../routes/AppRouter';
import {auth, database, } from '../firebase/firebase';
import Subject from './Subject';
//import Details from './Details';
import SubjectHomePage from './SubjectHomePage';
import '../styles/AllSubjects.css';

class AllSubjects extends React.Component {

	constructor() {
		super();

		this.state = {
			allSubjects: []
		};

	}

	componentDidMount() {
		let allSubjects = [];
		database.collection('subjects').get()
		.then(subjects => {
			subjects.forEach(subject => {
				console.log(subject)
				const da=subject.data();
				console.log(da)
				allSubjects.push(da)
			});
			this.setState({ allSubjects });
			allSubjects = [];
		})
	
	}
	
	goBack() {
		history.goBack();
	}

	goHome() {
		history.push('/homepage');
	}

	
	subjectClickHandler() {
		history.push('/subjecthomepage')
	}


	displayAllSubjects() {
		console.log(this.state.allSubjects)

		return this.state.allSubjects.map((subject, index) => {
			return (

				<div onClick={this.subjectClickHandler}>
					<Subject 
				
				subjectCode={subject.subjectCode}
				subjectName={subject.subjectName}
				instructorName={subject.instructorName}
				key={index}
				index={index}
				/>
				</div>
			)
		});
	}

	render() {

		return (
			<div id="all-subjects-page">
				<div className="all-subjects">
					
					{ this.displayAllSubjects() }
				</div>
			</div>
		);
	}
}

export default AllSubjects;
