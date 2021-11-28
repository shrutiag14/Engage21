import React , { useEffect, useState,useRef }from "react";

import { auth, database } from "../firebase/firebase";

import Header from "./Header";

import "../styles/OpenDiscussion.css";

const  OpenDiscussion=()=>  {
	const [allMessages,setAllMessages]=useState([])
	const [userName,setUserName]=useState('')
	const [authh,setAuthh]=useState('')
	const [message,setMessage]=useState()
	const [value,setValue]=useState(false)
	

	useEffect(() => {
		
		let allMessages = [];
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
			.then((user) => {
				// console.log(user);
				user.forEach(doc => {
					console.log(doc.data())
					if (doc.data().userUID === authh) {
						setUserName(doc.data().userEmail) 
					}
					// console.log(user);
				});
			});

console.log(userName)
		database
			.collection("openDiscussionMessages")
			.get()
			.then((messages) => {
				messages.forEach((message) => {
					allMessages.push({ ...message.data() });
				});
				setAllMessages(allMessages)
				allMessages = [];
			});
	},[value]
	)

	const displayMessages=()=> {
		
		return allMessages.map((message) => {
			return (
				<div className="message">
					<div className="message-user">{message.user}</div>
					<pre className="message-body">{message.message}</pre>
				</div>
			);
		});
	}

const	sendMessage=()=> {
		
		console.log(userName)
		database.collection("openDiscussionMessages").add({
			user: userName,
			message: message,
		});

		setMessage('')
		setValue(!value)
	}

	
		return (
			<div id="open-discussion-page">
		
				<div className="open-discussion-div">
					<Header  />
					<div className="open-discussion-page-title">
						Open Discussion
					</div>
					{displayMessages()}
					<div>
						<div className="extra-div"></div>
						<textarea
							type="text"
							className="message-input"
							value={message}
							onChange={(e)=>setMessage(e.target.value)}
						></textarea>
						<button
							className="message-send-button"
							onClick={sendMessage}
						>
							Send Message
						</button>
					</div> 
				</div>
			</div>
		);
	
}

export default OpenDiscussion;
