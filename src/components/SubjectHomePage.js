import React from 'react';
import { history } from '../routes/AppRouter';
import Header from './Header';
import ShortAnnouncements from './ShortAnnouncements';
// import Discussions from './Discussions';
import Assignments from './Assignments';
// import Notes from './Notes'
import '../styles/SubjectHomePage.css';

class SubjectHomePage extends React.Component {

	constructor() {
		super();

		this.state = {
			subjectName: '',
			subjectCode: '',
			dbSubjectKey: ''
		};

		this.goToStudyMaterials = this.goToStudyMaterials.bind(this);
		this.goToAssgiment = this.goToAssgiment.bind(this);
		this.goToOpenDiscussion = this.goToOpenDiscussion.bind(this);
	}
	
	goToStudyMaterials() {
		history.push('/studymaterials');
	}
	goToAssgiment() {
		history.push('/assignment');
	}

	goToOpenDiscussion() {
		history.push('/opendiscussion');
	}

	render() {
		const subIndex = history.location.search.slice(1, history.location.search.length).split('=')[1];
		return (
			<div id="subject-home-page">
				<div className="subject-home">
					<Header />
					<ShortAnnouncements subIndex={subIndex} dbUserKey={this.props.dbUserKey} />
					<div className="open-and-specific-discussions">
						<div className="open-discussion" onClick={this.goToOpenDiscussion}>
							<div className="open-discussion-title">Open Discussion</div>
							<p>Open discussion to clear small doubts or convey a message to everyone.</p>
						</div>
					</div>
					<div className="assignments-study-material">
						<div className="study-material" onClick={this.goToStudyMaterials}>
							<div className="study-material-title">Study Materials</div>
							<p>Contains lecture slides uploaded by the instructor and other reference materials.</p>
						</div>
						<div onClick={this.goToAssgiment}>
						<Assignments
							dbUserKey={this.props.dbUserKey}
							dbSubjectKey={this.state.dbSubjectKey}
							subjectCode={this.state.subjectCode}
							subjectName={this.state.subjectName}
						/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SubjectHomePage;
