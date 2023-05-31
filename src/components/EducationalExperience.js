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

    // Toggle between entering an initial end date or pressing the present button.
    endDatePresent(){
        if(this.presentDate === false)
        {
            this.presentDate = true; 
            this.endDateRequired = false;

            const presentButton = document.querySelector('.educational-experience-container > form > div:nth-child(4) > span > button');
            presentButton.removeAttribute('id');
            presentButton.setAttribute('id', 'present-button-clicked-edu-true');
        }
        else if(this.presentDate === true)
        {
            this.presentDate = false;
            this.endDateRequired = true;
 
            const presentButton = document.querySelector('.educational-experience-container > form > div:nth-child(4) > span > button');
            presentButton.removeAttribute('id'); 
            presentButton.setAttribute('id', 'present-button-clicked-edu-false');
        }
    }

    render(){
        const {schoolName, mainStudy, startDate, endDate, endDateValidity, handleChange, handleInfo, setEndDateValidity} = this.props;

        return(
            <div className="educational-experience-container"> 
            <h2>Educational Experience</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                
                const startDateParsed = parse(startDate, 'yyyy-MM-dd', new Date());
                const endDateParsed = parse(endDate, 'yyyy-MM-dd', new Date());
                
                const dateComparisonResult = compareAsc(
                    new Date(startDateParsed.getFullYear(), startDateParsed.getMonth() + 1, startDateParsed.getDate()),
                    new Date(endDateParsed.getFullYear(), endDateParsed.getMonth() + 1, endDateParsed.getDate())
                );

                const numericalPresentDate = new Date();
                
                if (this.presentDate)
                {
                    // Compare the user start date with the present date.
                    const presentDateComparisonResult = compareAsc(
                        new Date(startDateParsed.getFullYear(), startDateParsed.getMonth() + 1, startDateParsed.getDate()),
                        new Date(numericalPresentDate.getFullYear(), numericalPresentDate.getMonth() + 1, numericalPresentDate.getDate())
                    );

                    if (presentDateComparisonResult === 1)
                    {
                        alert("Invalid Date Input: The start date should come before the present date.");
                        return;
                    }
                    else if (presentDateComparisonResult === -1)
                    {
                        handleInfo({schoolName: schoolName, mainStudy: mainStudy, startDate: startDate, endDate: "Present", isEduInfo: true, id: uniqid()});
                        this.presentDate = false;
                        const presentButton = document.querySelector('.educational-experience-container > form > div:nth-child(4) > span > button');
                        presentButton.removeAttribute('id');
                        presentButton.setAttribute('id', 'present-button-clicked-edu-false');
                    }
                    else if (presentDateComparisonResult === 0)
                    {
                        handleInfo({schoolName: schoolName, mainStudy: mainStudy, startDate: startDate, endDate: "Present", isEduInfo: true, id: uniqid()});
                        this.presentDate = false;
                        const presentButton = document.querySelector('.educational-experience-container > form > div:nth-child(4) > span > button');
                        presentButton.removeAttribute('id');
                        presentButton.setAttribute('id', 'present-button-clicked-edu-false');
                    }
                }
                else
                {
                    if (endDateValidity)
                    {   
                        alert("End date must be entered or present button must be clicked.");
                        return;
                    }
                    else if (dateComparisonResult === 1)
                    {
                        alert("Invalid Date Input: The start date should come before the end date.");
                        setEndDateValidity();
                        return;
                    }
                    else if (dateComparisonResult === -1)
                    {
                        handleInfo({schoolName: schoolName, mainStudy: mainStudy, startDate: startDate, endDate: endDate, isEduInfo: true, id: uniqid()});
                        setEndDateValidity();
                    }
                    else if (dateComparisonResult === 0)
                    {
                        handleInfo({schoolName: schoolName, mainStudy: mainStudy, startDate: startDate, endDate: endDate, isEduInfo: true, id: uniqid()});
                        setEndDateValidity();
                    }
                }
                
            }}>

                <div>
                    <label htmlFor="schoolName">School Name</label>
                    <input onChange={handleChange} type="text" id="schoolName" name="schoolName" required maxLength={50} value={schoolName} />
                </div>

                <div>
                    <label htmlFor="mainStudy">Main Study</label>
                    <input onChange={handleChange} type="text" id="mainStudy" name="mainStudy" required maxLength={50} value={mainStudy} />
                </div>

                <div>
                    <label htmlFor="startDate">Start Date</label>
                    <input onChange={handleChange} type="date" id="startDate" name="startDate" required value={startDate} />
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