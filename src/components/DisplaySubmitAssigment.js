import React, { useEffect, useState,useRef } from "react";



const  DisplaySubmitAssigment=({Id,date,assigment})=>{

console.log('subject')


return (
    <div className="announcement" >
        <div className="announcement-title">Student id {Id}</div>

        <div className="announcement-title">Submited Date {date}</div>

        <a href={assigment} target="blank" className="announcement-title">To see the assigment</a>
        

       

    </div>
);

}
export default DisplaySubmitAssigment;
