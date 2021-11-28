import React, { useEffect, useState, useRef } from "react";
import { database, storage, auth } from '../firebase/firebase';
import { v4 as uuidv4 } from "uuid";
//import '../styles/Announcement.css';
import '../styles/Assignments.css'
const DisplayDetails = ({ description, assignmentFiles, title }) => {
    const [file, setFile] = useState()
    const [blogs, setBlogs] = useState([])
    const [blog, setBlog] = useState([])


    const data = []
    useEffect(() => {

        const fetchData = async () => {

            database.collection('assigmentDetails').get()
                .then(users => {
                    users.forEach(user => {
                        let da = user.data()
                        data.push(da)


                    })
                }


                );

        }
        fetchData()
        setBlog(data)

    }, [])


    console.log(blog)
    console.log(blogs)

    const changee = () => {
        console.log('details')
        setBlogs(blog)
    }

    return (
        <div className="announcement">

            <div className="iddetails" onClick={changee}>Student Submissions</div>

            {blog &&
                blog.map((data, index) => {
                    return (

                        <div key={index} className="announcement" >
                            <div className="announcement-title">Assignment Details : {data.title}</div>
                            <div className="announcement-title">Student id : {data.id}</div>

                            <div className="announcement-title">Submitted Date : {data.date}</div>

                            <a href={data.assignmentFiles} target="blank" className="announcement-title">Submitted Assignment</a>




                        </div>
                    )
                })

            }
        </div>
    );

}

export default DisplayDetails;
