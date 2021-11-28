import React, { useEffect, useState, useRef } from "react";
import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Line } from 'rc-progress';
import { database, storage } from '../firebase/firebase';
import { v4 as uuidv4 } from "uuid";
import ShortAssignment from './ShortAssignment';
import DisplaySubmitAssigment from './DisplaySubmitAssigment'
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Assignments.css'
import Progress from './Progress';


const Assignments = ({ isTeacher }) => {
	const [uploadPercentage, setUploadPercentage] = useState(0);
	const [upload, setUpload] = useState(false)
	const [submit, setSubmit] = useState(false)
	const [showMoadl, setShowMoadl] = useState(false)
	const [allAssigment, setAllAssigment] = useState()
	const [file, setFile] = useState()
	const [url, setUrl] = useState()
	const [date, setDate] = useState()
	const [title, setTitle] = useState()
	const [description, setDescription] = useState()
	console.log(title)
	console.log(description)


	useEffect(() => {
		const data = []
		database.collection('assigmentDetails').get()
			.then(users => {
				users.forEach(user => {
					data.push(user.data())
					console.log(user.data())


				})
			}


			);
		setSubmit(data)

	}, [])

	console.log(submit)
	const handleOpenModal = () => {
		setShowMoadl(true)
	}

	const handleCloseModal = () => {

		setShowMoadl(false)


	}

	const handleChange = (data) => {
		setDate(data)
	}

	const addUploadButton = (event) => {
		setFile(event.target.files[0])
		console.log(file)
		setUpload(true)
	}

	const uploadFile = () => {

		let uploadTask = storage
			.ref()
			.child(`assigment/${uuidv4()}`)
			.put(file);

		console.log("uploadTask");

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				setUploadPercentage(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100)

				if (uploadPercentage === "100") {
					setSubmit(true)
					console.log("Upload is " + uploadPercentage + "% done");
				}
			},
			(error) => {
				console.log(error.message);
			},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					console.log("File available at", downloadURL);
					setUrl(downloadURL)
				});
			}
		);


	}


	const createAssignment = (event) => {
		event.preventDefault();
		console.log('details')

		database.collection('assigment').add({
			assignmentNumber: title,
			announcement: description,
			submissionDate: date.format('MMMM DD, YYYY, hh:mm A'),
			assignmentFiles: url,
		})
		console.log('add to data')
		setShowMoadl(false)
		nullValue()

	}



	const nullValue = () => {
		setUploadPercentage(0)
		setUpload(false)
		setSubmit(false)
		setSubmit([])
		setFile(null)
		setUrl(null)
		setDate(null)
		setTitle(null)
		setDescription(null)
		handleCloseModal()
	}


	console.log('teacher', isTeacher)
	console.log(file)
	console.log(date)
	let createAssignments = isTeacher ? <button className="new-assignment-button" onClick={handleOpenModal}>Create a new Assignment</button> : null;
	console.log(submit)

	return (
		<div className="assignments">
			<div className="assignments-title">Assignments</div>

			{createAssignments}

			<ReactModal isOpen={showMoadl} contentLabel="Add Assignment" ariaHideApp={false} className="new-assignment-modal">
				<form className="new-assignment-form" onSubmit={createAssignment}>
					<div>Assignment Subject</div>
					<textarea type="number" className="new-assignment-title" onChange={(e) => setTitle(e.target.value)} required></textarea>
					<div>Assignment Description</div>
					<textarea type="text" className="new-assignment-description" onChange={(e) => setDescription(e.target.value)}></textarea>
					<br />
					{/* { this.displayUploadedFiles() } */}
					<br />
					{/* { button } */}
					<div>
						<input type="file" name="file" id="file" className="inputfile" onChange={addUploadButton} />
						<label htmlFor="file">&#8686; Choose a file</label>
						{upload && <Progress percentage={uploadPercentage} />}

						<div disabled={!upload} className="upload-file-button" onClick={uploadFile}> Upload</div>

					</div>
					<br />
					<div >To be submitted before</div>
					<DatePicker
						selected={date}
						onChange={handleChange}
						timeFormat="HH:mm"
						timeIntervals={10}
						timeCaption="Time"
						dateFormat="LLL"
						className="date-picker"
						placeholderText="Select Date and Time"
						showTimeSelect
					/>
					<button type="submit" value="Create Assignment" className="create-assignment-button" >Create Assigment</button>
					<button className="close-modal" onClick={nullValue}>Cancel</button>
				</form>
			</ReactModal>



		</div>
	);

}

export default Assignments;
