import React from 'react';
import { history } from '../routes/AppRouter';
//import Sub from './Sub'
import '../styles/Subject.css';

const Subject = ({subjectCode,subjectName,instructorName})=> {
	console.log(subjectCode)
	console.log(subjectName)

	console.log('sdfddfs')

	

	const chnge =()=> {
		console.log('sdfddfs')

	}
	return (
			<div  className="subject">
			
				<div onClick={()=>chnge()} className="subject-info">
					<div className="subject-code">Subject code : {subjectCode}</div>
					<div className="subject-name">Subject Name : {subjectName}</div>
				</div>
				
				<div className="instructor-name">Instructor: {instructorName}</div>
			</div>
		);

}

export default Subject;
