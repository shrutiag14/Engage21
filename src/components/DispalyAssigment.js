import React, { useEffect, useState,useRef } from "react";
import { database, storage, auth } from '../firebase/firebase';
import { v4 as uuidv4 } from "uuid";
import '../styles/Announcement.css';
import Progress from './Progress';

const DisplayAssigment =({description,assignmentFiles,title,lastDate})=> {
const [file,setFile]=useState()
const [uploadPercentage, setUploadPercentage] = useState(0);
const [id,setId]=useState()
const [url,setUrl]=useState()
const[upload,setUpload]=useState(false)
   

   const addUploadButton =(event)=> {
        setFile(event.target.files[0])
        console.log(file)
    }



    useEffect(()=> {

        let authh;
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("Logged In");
                authh = auth.currentUser.uid;
                console.log(authh);
            }
        });

        database.collection('users').get()
            .then(users => {
                users.forEach(user => {
                    if (user.data().userUID === authh) {
                        console.log(user.data())

                        if (user.data().userType === 'Student') {
                            setId(user.data().studentID)
                            console.log(user.data())

                        }
                    }
                }
                )

            });
        
    },[])


  const  uploadFile=()=> {

		let uploadTask = storage
			.ref()
			.child(`submitassigment/${uuidv4()}`)
			.put(file);

		console.log("uploadTask");

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				setUploadPercentage(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100)

				if (uploadPercentage === "100")
					console.log("Upload is " + uploadPercentage + "% done");
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
        setUpload(true)

        setTimeout(() => setUploadPercentage(0), 10000);


}
	
console.log(assignmentFiles)

  const  submitHandler=()=> {
        let today = new Date(); 
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        database.collection('assigmentDetails').add({

            assignmentFiles: url,
            date: date,
            id: id,
            title
        })
        console.log('add to assignment')
        

    }
        return (
            <div className="announcement">
                <div className="announcement-title">Subject Assignment : {title}</div>

                <div className="announcement-title">Assignment Details : {description}</div>
                <div className="announcement-title">Due Date : {lastDate}</div>

                <a href={assignmentFiles} target="blank" color="black">Submit Assignment</a>


                <label htmlFor="file" className="title">&#8686; Choose a file </label>


                <input type="file" name="file" id="file" className="inputfile" onChange={addUploadButton} />
                <Progress percentage={uploadPercentage} />

                <button disabled={!file}  className="button" onClick={uploadFile}>Upload</button>

                <button disabled={!upload} className="button" onClick={submitHandler} >Submit</button>

            </div>
        );
    
}

export default DisplayAssigment;
