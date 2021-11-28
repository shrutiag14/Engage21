import React, { useEffect, useState, useRef } from 'react';
import ReactModal from 'react-modal';
import { auth, database } from '../firebase/firebase';
import { history } from '../routes/AppRouter';
import DisplayNotes from './DisplayNotes';

import Header from './Header';
import Announcement from './Announcement';

import '../styles/Announcements.css';

const Announcements = () => {

	const [allAnnouncements, setallAnnouncements] = useState([])
	const [userType, setuserType] = useState('')
	const [showModal, setshowshowModal] = useState(false)
	const [update, setupdate] = useState(false)
	const [allNotes, setallnotes] = useState([])
	const [announce, setannounce] = useState([])
	const [subject, setsubject] = useState([])


	const handleOpenModal = () => {
		setshowshowModal(true);
	}

	const handleCloseModal = () => {
		setshowshowModal(false);
	}

	const addAnnouncement = (event) => {
		event.preventDefault();
		database.collection('ShortAnnouncements').add({
			announce: announce,
			subject: subject

		});
		setupdate(!update)
		setshowshowModal(false);
	}



	useEffect(() => {

		let allAnnouncements = [];
		let allNotes = [];
		let authh;
		auth.onAuthStateChanged((user) => {
			if (user) {
				console.log("Logged In");
				authh = auth.currentUser.uid;
				console.log(authh);
			}
		});

		database
			.collection("users")
			.get()
			.then(user => {
				user.forEach(doc => {
					console.log(doc.data())
					if (doc.data().userUID === authh && doc.data().userType === "Teacher") {
						console.log('loginTeacher');
						setuserType('Teacher')
						handleOpenModal()
					}

				});
			});
		console.log(userType)





		database
			.collection("ShortAnnouncements/")
			.get()

			.then(subjects => {
				let currentIndex = 0;
				subjects.forEach(subject => {
					allAnnouncements.push({ ...subject.data() });
				});
				allAnnouncements.reverse();

				setallAnnouncements(allAnnouncements);
				allAnnouncements = [];

				currentIndex++;

				currentIndex = 0;
			});
	}
		, [update])


	const displayAnnouncements = () => {
		console.log(allAnnouncements)
		console.log(allNotes)
		return allAnnouncements.map((announcement, index) => {
			return (
				<Announcement
					title={announcement.announce}
					subject={announcement.subject}
					key={index}
					index={index}
				/>
			);
		});
	}




	return (
		<div id="announcements-page">
			{/* <Background /> */}
			<div className="announcements">

				<Header />
				<div>
					{userType === 'Teacher' && <button onClick={handleOpenModal} className="close-modal-button">Add annoucement</button>}
				</div>
				{displayAnnouncements()}

				<div className="new-announcement-div">
					<ReactModal isOpen={showModal} contentLabel="Add Announcement" ariaHideApp={false} className="new-announcement-modal">
						<form className="new-announcement-form" onSubmit={addAnnouncement}>
							<div>Subject</div>
							<textarea type="text" 
							className="new-announcement-title"
							onChange={(e) => setannounce(e.target.value)}
							></textarea>
							<div>Announcement Description</div>
							<textarea type="text" className="new-announcement-title" onChange={(e) => setsubject(e.target.value)}></textarea>
							<input type="submit" value="Add Announcement" className="add-announcement-button" />
							<button onClick={handleCloseModal} className="close-modal-button">Cancel</button>
						</form>
					</ReactModal>
				</div>
			</div>
		</div>
	);
}


export default Announcements;
