import React , { useEffect, useState,useRef } from 'react';
import ReactModal from 'react-modal';

import '../styles/Announcement.css';

class Announcement extends React.Component {

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
				<div className="announcement-title">Announcement : {this.props.subject}</div>
				
			</div>
		);
	}
}

export default Announcement;
