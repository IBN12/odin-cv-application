import React, { Component } from "react";
import { SubmitButton } from "./SumbitButton";
import uniqid from "uniqid";

// EducationalExperience Class: The educational experience class component.
export class EducationalExperience extends Component{
    constructor(props){
        super(props);
        this.presentDate = false;
        this.endDatePresent = this.endDatePresent.bind(this); 
    }

    endDatePresent(){
        console.log("End Date Present Function For Educational Experience..."); // Testing
        if(this.presentDate === false)
        {
            this.presentDate = true; 
            console.log("Present Date Educational Experience: ", this.presentDate); // Testing
        }
        else if(this.presentDate === true)
        {
            this.presentDate = false;
            console.log("Present Date Education Experience: ", this.presentDate); // Testing
        }
    }

    render(){
        const {schoolName, mainStudy, startDate, endDate, handleChange, handleInfo} = this.props;

        return(
            <div className="educational-experience-container"> 
            <h2>Educational Experience</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                console.log("School Name: ", schoolName); // Testing
                console.log("Main Study: ", mainStudy); // Testing
                console.log("Start Date: ", startDate); // Testing
                console.log("End Date: ", endDate); // Testing
                
                if (this.presentDate)
                {
                    handleInfo({schoolName: schoolName, mainStudy: mainStudy, startDate: startDate, endDate: "Present", isEduInfo: true, id: uniqid()});
                    this.presentDate = false;
                }
                else
                {
                    handleInfo({schoolName: schoolName, mainStudy: mainStudy, startDate: startDate, endDate: endDate, isEduInfo: true, id: uniqid()});
                }
            }}>

                <div>
                    <label htmlFor="schoolName">School Name</label>
                    <input onChange={handleChange} type="text" id="schoolName" name="schoolName" value={schoolName} />
                </div>

                <div>
                    <label htmlFor="mainStudy">Main Study</label>
                    <input onChange={handleChange} type="text" id="mainStudy" name="mainStudy" value={mainStudy} />
                </div>

                <div>
                    <label htmlFor="startDate">Start Date</label>
                    <input onChange={handleChange} type="date" id="startDate" name="startDate" value={startDate} />
                </div>

                <div>
                    <label htmlFor="endDate">End Date</label>
                    <span><input onChange={handleChange} type="date" id="endDate" name="endDate" disabled={this.presentDate} value={endDate} /> <button type="button" onClick={this.endDatePresent}>Present</button></span>
                </div>

                <div>
                    <SubmitButton />
                </div>
            </form>
            
            </div>
        );
    }
}