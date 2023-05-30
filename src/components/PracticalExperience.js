import React, { Component } from "react";
import { SubmitButton } from "./SumbitButton";
import uniqid from "uniqid";
import {compareAsc, parse} from "date-fns";

// PracticalExperience Class:
export class PracticalExperience extends Component{
    constructor(props){
        super(props)
        this.presentDate = false;
        this.endPresentDate = this.endPresentDate.bind(this);
    }
    
    componentDidMount(){
        const presentButton = document.querySelector('.practical-experience-container > form > div:nth-child(5) > span > button');
        presentButton.setAttribute('id', 'present-button-clicked-prac-false');
    }

    endPresentDate(){
        console.log("End Present Date Function For Work Experience..."); // Testing
        if (this.presentDate === false)
        {
            this.presentDate = true;
            console.log("Present Date Work Experience: ", this.presentDate); // Testing
            const presentButton = document.querySelector('.practical-experience-container > form > div:nth-child(5) > span > button');
            presentButton.removeAttribute('id');
            presentButton.setAttribute('id', 'present-button-clicked-prac-true');
        }
        else if(this.presentDate === true)
        {
            this.presentDate = false;
            console.log("Present Date Work Experience: ", this.presentDate); // Testing
            const presentButton = document.querySelector('.practical-experience-container > form > div:nth-child(5) > span > button');
            presentButton.removeAttribute('id');
            presentButton.setAttribute('id', 'present-button-clicked-prac-false');
        }
    }

    render(){
        const {handleChange, handleInfo, companyName, positionTitle, mainTask, wStartDate, wEndDate} = this.props;

        return(
            <div className="practical-experience-container">
                <h2>Work Experience</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Company Name: ", companyName); // Testing
                    console.log("Position Title: ", positionTitle); // Testing 
                    console.log("Main Task: ", mainTask); // Testing
                    console.log("\n"); // Testing

                    console.log("Work Start Date: ", wStartDate); // Testing
                    const wStartDateParse = parse(wStartDate, 'yyyy-MM-dd', new Date());
                    console.log("Work Start Date Parsed: ", wStartDateParse); // Testing
                    console.log("Year: ", wStartDateParse.getFullYear()); // Testing
                    console.log("Month: ", wStartDateParse.getMonth() + 1); // Testing
                    console.log("Date: ", wStartDateParse.getDate()); // Testing
                    console.log("\n"); // Testing

                    console.log("Work End Date: ", wEndDate); // Testing
                    const wEndDateParse = parse(wEndDate, 'yyyy-MM-dd', new Date());
                    console.log("Work End Date Parsed: ", wEndDateParse); // Testing
                    console.log("Year: ", wEndDateParse.getFullYear()); // Testing
                    console.log("Month: ", wEndDateParse.getMonth() + 1); // Testing
                    console.log("Date: ", wEndDateParse.getDate());

                    const dateComparisonResult = compareAsc(
                        new Date(wStartDateParse.getFullYear(), wStartDateParse.getMonth() + 1, wStartDateParse.getDate()),
                        new Date(wEndDateParse.getFullYear(), wEndDateParse.getMonth() + 1, wEndDateParse.getDate())
                    );
                    console.log("Date Comparison Result: ", dateComparisonResult); // Testing
                    console.log("\n"); // Testing

                    const numericalPresentDate = new Date();
                    console.log("Numerical Present Date: ", numericalPresentDate); // Testing
                    console.log("Year: ", numericalPresentDate.getFullYear()); // Testing
                    console.log("Month: ", numericalPresentDate.getMonth() + 1); // Testing 
                    console.log("Date: ", numericalPresentDate.getDate()); // Testing

                    if (this.presentDate)
                    {
                        // Compare the user start date with the present date.
                        const presentDateComparisonResult = compareAsc(
                            new Date(wStartDateParse.getFullYear(), wStartDateParse.getMonth() + 1, wStartDateParse.getDate()),
                            new Date(numericalPresentDate.getFullYear(), numericalPresentDate.getMonth() + 1, numericalPresentDate.getDate())
                        );
                        console.log("Present Date Comparison Result: ", presentDateComparisonResult); // Testing

                        if (presentDateComparisonResult === 1)
                        {
                            console.log("Invalid Date Input: The start date should come before the present date."); // Testing
                            alert("Invalid Date Input: The start date should come before the present date.");
                            return;
                        }
                        else if (presentDateComparisonResult === -1)
                        {
                            handleInfo({companyName: companyName, positionTitle: positionTitle, mainTask: mainTask, wStartDate: wStartDate, wEndDate: "Present", isWorkInfo: true, id: uniqid()});
                            this.presentDate = false; 
                        }
                        else if (presentDateComparisonResult === 0)
                        {
                            handleInfo({companyName: companyName, positionTitle: positionTitle, mainTask: mainTask, wStartDate: wStartDate, wEndDate: "Present", isWorkInfo: true, id: uniqid()});
                            this.presentDate = false; 
                        }
                    }
                    else
                    {
                        if (dateComparisonResult === 1)
                        {
                            console.log("Invalid Date Input: The start date should come before the end date."); // Testing
                            alert("Invalid Date Input: The start date should come before the end date."); // Testing
                            return;
                        }
                        else if (dateComparisonResult === -1)
                        {
                            handleInfo({companyName: companyName, positionTitle: positionTitle, mainTask: mainTask, wStartDate: wStartDate, wEndDate: wEndDate, isWorkInfo: true, id: uniqid()});
                        }
                        else if (dateComparisonResult === 0)
                        {
                            handleInfo({companyName: companyName, positionTitle: positionTitle, mainTask: mainTask, wStartDate: wStartDate, wEndDate: wEndDate, isWorkInfo: true, id: uniqid()});
                        }
                    }
                }}>
                    <div>
                        <label htmlFor="companyName">Company Name</label>
                        <input onChange={handleChange} type="text" name="companyName" id="companyName" value={companyName} />
                    </div>

                    <div>
                        <label htmlFor="positionTitle">Position Title</label>
                        <input onChange={handleChange} type="text" name="positionTitle" id="positionTitle" value={positionTitle} />
                    </div>

                    <div>
                        <label htmlFor="mainTask">Main Task</label>
                        <input onChange={handleChange} type="text" name="mainTask" id="mainTask" value={mainTask} />
                    </div>

                    <div>
                        <label htmlFor="wStartDate">Start Date</label>
                        <input onChange={handleChange} type="date" name="wStartDate" id="wStartDate" value={wStartDate} />
                    </div>

                    <div>
                        <label htmlFor="wEndDate">End Date</label>
                        <input onChange={handleChange} type="date" name="wEndDate" id="wEndDate" disabled={this.presentDate} value={wEndDate} /> <span><button type="button" onClick={this.endPresentDate}>Present</button></span>
                    </div>
                    
                    <div>
                        <SubmitButton/>
                    </div>
                </form>

            </div>
        );
    }
}