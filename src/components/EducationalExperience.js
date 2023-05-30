import React, { Component } from "react";
import { SubmitButton } from "./SumbitButton";
import uniqid from "uniqid";
import { compareAsc, parse } from "date-fns";

// EducationalExperience Class: The educational experience class component.
export class EducationalExperience extends Component{
    constructor(props){
        super(props);
        this.presentDate = false;
        this.endDatePresent = this.endDatePresent.bind(this); 
    }

    componentDidMount(){
        const presentButton = document.querySelector('.educational-experience-container > form > div:nth-child(4) > span > button');
        presentButton.setAttribute('id', 'present-button-clicked-edu-false');
    }

    endDatePresent(){
        console.log("End Date Present Function For Educational Experience..."); // Testing
        if(this.presentDate === false)
        {
            this.presentDate = true; 
            console.log("Present Date Educational Experience: ", this.presentDate); // Testing
            const presentButton = document.querySelector('.educational-experience-container > form > div:nth-child(4) > span > button');
            console.log("The Present Button: ", presentButton); // Testing
            presentButton.removeAttribute('id');
            presentButton.setAttribute('id', 'present-button-clicked-edu-true');
        }
        else if(this.presentDate === true)
        {
            this.presentDate = false;
            console.log("Present Date Education Experience: ", this.presentDate); // Testing
            const presentButton = document.querySelector('.educational-experience-container > form > div:nth-child(4) > span > button');
            presentButton.removeAttribute('id'); 
            presentButton.setAttribute('id', 'present-button-clicked-edu-false');
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
                console.log("\n"); // Testing

                console.log("Start Date: ", startDate); // Testing
                const startDateParsed = parse(startDate, 'yyyy-MM-dd', new Date());
                console.log('Start Date Parsed: ', startDateParsed); // Testing
                console.log('Year: ', startDateParsed.getFullYear()); // Testing
                console.log('Month: ', startDateParsed.getMonth() + 1); // Testing
                console.log('Date: ', startDateParsed.getDate()); // Testing
                console.log("\n"); // Testing

                console.log("End Date: ", endDate); // Testing
                const endDateParsed = parse(endDate, 'yyyy-MM-dd', new Date());
                console.log('End Date Parsed: ', endDateParsed); // Testing
                console.log('Year: ', endDateParsed.getFullYear()); // Testing
                console.log('Month: ', endDateParsed.getMonth() + 1); // Testing
                console.log('Date: ', endDateParsed.getDate()); // Testing
                console.log("\n"); // Testing

                const dateComparisonResult = compareAsc(
                    new Date(startDateParsed.getFullYear(), startDateParsed.getMonth() + 1, startDateParsed.getDate()),
                    new Date(endDateParsed.getFullYear(), endDateParsed.getMonth() + 1, endDateParsed.getDate())
                )
                console.log("Date Comparison Result: ", dateComparisonResult); // Testing
                console.log("\n"); // Testing

                const numericalPresentDate = new Date();
                console.log('Numerical Present Date: ', numericalPresentDate); // Testing
                console.log('Year: ', numericalPresentDate.getFullYear()); // Testing
                console.log('Month: ', numericalPresentDate.getMonth() + 1); // Testing
                console.log('Date: ', numericalPresentDate.getDate()); // Testing
                console.log("\n"); // Testing 
                
                if (this.presentDate)
                {
                    // Compare the user start date with the present date.
                    const presentDateComparisonResult = compareAsc(
                        new Date(startDateParsed.getFullYear(), startDateParsed.getMonth() + 1, startDateParsed.getDate()),
                        new Date(numericalPresentDate.getFullYear(), numericalPresentDate.getMonth() + 1, numericalPresentDate.getDate())
                    );
                    console.log("Present Date Comparison Result: ", presentDateComparisonResult); // Testing

                    if (presentDateComparisonResult === 1)
                    {
                        console.log("Invalid Date Input: The start date comes after the present date."); // Testing
                        alert("Invalid Date Input: The start date should come before the present date.");
                        return;
                    }
                    else if (presentDateComparisonResult === -1)
                    {
                        handleInfo({schoolName: schoolName, mainStudy: mainStudy, startDate: startDate, endDate: "Present", isEduInfo: true, id: uniqid()});
                        this.presentDate = false;
                    }
                    else if (presentDateComparisonResult === 0)
                    {
                        handleInfo({schoolName: schoolName, mainStudy: mainStudy, startDate: startDate, endDate: "Present", isEduInfo: true, id: uniqid()});
                        this.presentDate = false;
                    }
                }
                else
                {
                    if (dateComparisonResult === 1)
                    {
                        console.log("Invalid Date Input: The start date comes after the end date."); // Testing
                        alert("Invalid Date Input: The start date should come before the end date.");
                        return;
                    }
                    else if (dateComparisonResult === -1)
                    {
                        handleInfo({schoolName: schoolName, mainStudy: mainStudy, startDate: startDate, endDate: endDate, isEduInfo: true, id: uniqid()});
                    }
                    else if (dateComparisonResult === 0)
                    {
                        handleInfo({schoolName: schoolName, mainStudy: mainStudy, startDate: startDate, endDate: endDate, isEduInfo: true, id: uniqid()});
                    }
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
                    <input onChange={handleChange} type="date" id="endDate" name="endDate" disabled={this.presentDate} value={endDate} /> <span><button type="button" onClick={this.endDatePresent}>Present</button></span>
                </div>

                <div>
                    <SubmitButton />
                </div>
            </form>
            
            </div>
        );
    }
}