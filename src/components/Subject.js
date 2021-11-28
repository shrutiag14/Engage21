import React from 'react';
import { history } from '../routes/AppRouter';
import '../styles/Subject.css';
import SubjectHomePage from './SubjectHomePage';
class Subject extends React.Component {

	constructor() {
		super();

		this.subjectClickHandler = this.subjectClickHandler.bind(this);
	}

	subjectClickHandler() {
		history.push('/subjecthomepage')
	}


	render() {
		return (
        
			<div className="subject" onClick={this.subjectClickHandler}>
				<div className="subject-info" onClick={this.subjectClickHandler}>
				
					<div className="subject-code">Subject Code: {this.props.subjectCode}</div>
					<div className="subject-name">Subject Name: {this.props.subjectName}</div>
					</div>
				
				<div className="instructor-name">Instructor: {this.props.instructorName}</div>
				
			</div>
		);
	}
}

export default Subject;
