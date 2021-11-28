import React, { useEffect, useState } from "react";
import { Line } from "rc-progress";
import ReactModal from "react-modal";
import { v4 as uuidv4 } from "uuid";

import { database, storage } from "../firebase/firebase";
// import "../styles/LectureNotes.css";
import Progress from './Progress';

const LectureNotees = ({ isTeacher }) => {
	const [file, setFile] = useState();
	const [url, setUrl] = useState();
	const [uploadPercentage, setUploadPercentage] = useState(0);

	const [title, setTitle] = useState();
	console.log("sdfd");
	console.log(isTeacher);

	useEffect(() => {
		if (url) {
			try {
				database.collection("blogs").add({
					title,
					notes: url,
					createdAt: new Date(),
				});
				console.log("database created");
			} catch (e) {
				console.log("error cerated");
			}
		}
	}, [url]);

	const submitDeatils = (e) => {
		console.log("helo");
		let uploadTask = storage
			.ref()
			.child(`lecutreNotes/${uuidv4()}`)
			.put(file);
		console.log("uploadTask");

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				setUploadPercentage(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
			},
			(error) => {
				console.log(error.message);
			},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					console.log("File available at", downloadURL);
					setUrl(downloadURL);
				});
			}
		);
	};

	
	console.log(isTeacher);
	return (
		<div>
			{isTeacher && (
				<div>
				  Notes Title
					<input
						type="text"
						className="form-input"
						value={title}
						placholder= "Title"
						onChange={(e) => setTitle(e.target.value)}
					/>
					<div className="btn-2">
						<div className="f">
						<span>File</span>
						</div>
						<input
							type="file"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</div>
					<Progress percentage={uploadPercentage} />

					<button
						className="b btn orange darken-1 fb8c00"
						onClick={() => submitDeatils()}
					>
						Submit
					</button>
				</div>
			)}
		</div>
	);
};
export default LectureNotees;
