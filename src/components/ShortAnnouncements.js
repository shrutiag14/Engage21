import React from "react";
import { database } from "../firebase/firebase";
import { history } from "../routes/AppRouter";

import "../styles/ShortAnnouncements.css";

class ShortAnnouncements extends React.Component {
	constructor() {
		super();

		this.state = {
			allAnnouncements: [],
		};

		this.displayShortAnnouncements =
			this.displayShortAnnouncements.bind(this);
		this.linkToAnnouncements = this.linkToAnnouncements.bind(this);
	}

	componentDidMount() {
		let allAnnouncements = [];

		database
			.collection("ShortAnnouncements/")
			.get()

			.then(subjects => {
				// let currentIndex = 0;
				subjects.forEach(subject => {
					allAnnouncements.push({ ...subject.data() });
				});
				allAnnouncements.reverse();

				this.setState({ allAnnouncements });
				allAnnouncements = [];

				// currentIndex++;

				// currentIndex = 0;
			});
	}

	linkToAnnouncements() {
		history.push("/announcements" );
	}

	displayShortAnnouncements() {
		return this.state.allAnnouncements.map((announcement, index) => {
			if(index>2){
				return 
			}
			return (
				<div key={index} className="short-announcement">
					
					{announcement.announce}
				</div>
			);
		});
	}

	render() {
		return (
			<div className="short-announcements">
				<div className="short-announcements-title">Announcements</div>
				{this.displayShortAnnouncements()}
				<button
					className="button more-announcement-button"
					onClick={this.linkToAnnouncements}
				>
					more...
				</button>
			</div>
		);
	}
}

export default ShortAnnouncements;
