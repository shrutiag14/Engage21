import React,{useState,useEffect} from 'react';
import { database} from '../firebase/firebase';
import Subject from './Subject';


const AllSubjec =()=>{

	const [Subjects,setSubjects]=useState([])

	    useEffect(() =>{

                        let allSubjects = [];
                        database.collection('subjects').get()
                        .then(subjects => {
                            subjects.forEach(subject => {
                                console.log(subject)
                                const da=subject.data();
                                console.log(da)
                                allSubjects.push(da)

                            
                            });
                            setSubjects(allSubjects);
                            allSubjects = [];
                        })
                    },[])
	
	
	

	
	

	const displayAllSubjects=()=> {
		console.log(Subjects)

		 Subjects.map((subject, index) => {
			return (

				<div >
					<Subject 
				
				subjectCode={subject.subjectCode}
				subjectName={subject.subjectName}
				instructorName={subject.instructorName}
				key={index}
				index={index}
				/>
				</div>
			)
		});
	}

	const chnage=()=>{
        console.log('sdfdsf')
    }

		return (
			<div id="all-subjects-page">
				<div className="all-subjects">
					<button onClick={()=>console.log('sddfs')}>dsfsdfds</button>
					{ displayAllSubjects() }
				</div>
			</div>
		);
	
}

export default AllSubjec;
