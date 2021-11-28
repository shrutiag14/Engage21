import React from 'react';

import '../styles/Announcement.css';

class DisplayNotes extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showModal: false
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);

	}

	handleOpenModal() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}

	render() {

		return (
			<div className="announcement">
				<div className="announcement-title">Subject Name : {this.props.title}</div>
				<div className="announcement-title" ><a href={this.props.subject} target="_blank">Download the file</a>
				</div>



			</div>
		);
	}
}

export default DisplayNotes;
