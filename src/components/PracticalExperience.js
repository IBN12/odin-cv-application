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

    // Toggle between entering an initial end date or pressing the present button.
    endPresentDate(){
        if (this.presentDate === false)
        {
            this.presentDate = true;
            
            const presentButton = document.querySelector('.practical-experience-container > form > div:nth-child(5) > span > button');
            presentButton.removeAttribute('id');
            presentButton.setAttribute('id', 'present-button-clicked-prac-true');
        }
        else if(this.presentDate === true)
        {
            this.presentDate = false;
            
            const presentButton = document.querySelector('.practical-experience-container > form > div:nth-child(5) > span > button');
            presentButton.removeAttribute('id');
            presentButton.setAttribute('id', 'present-button-clicked-prac-false');
        }
    }

    render(){
        const {handleChange, handleInfo, setWEndDateValidity, companyName, positionTitle, mainTask, wStartDate, wEndDate, wEndDateValidity} = this.props;

        return(
            <div className="practical-experience-container">
                <h2>Work Experience</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    const wStartDateParse = parse(wStartDate, 'yyyy-MM-dd', new Date());
                    const wEndDateParse = parse(wEndDate, 'yyyy-MM-dd', new Date());

                    const dateComparisonResult = compareAsc(
                        new Date(wStartDateParse.getFullYear(), wStartDateParse.getMonth() + 1, wStartDateParse.getDate()),
                        new Date(wEndDateParse.getFullYear(), wEndDateParse.getMonth() + 1, wEndDateParse.getDate())
                    );

                    const numericalPresentDate = new Date();

                    if (this.presentDate)
                    {
                        // Compare the user start date with the present date.
                        const presentDateComparisonResult = compareAsc(
                            new Date(wStartDateParse.getFullYear(), wStartDateParse.getMonth() + 1, wStartDateParse.getDate()),
                            new Date(numericalPresentDate.getFullYear(), numericalPresentDate.getMonth() + 1, numericalPresentDate.getDate())
                        );

                        if (presentDateComparisonResult === 1)
                        {
                            alert("Invalid Date Input: The start date should come before the present date.");
                            return;
                        }
                        else if (presentDateComparisonResult === -1)
                        {
                            handleInfo({companyName: companyName, positionTitle: positionTitle, mainTask: mainTask, wStartDate: wStartDate, wEndDate: "Present", isWorkInfo: true, id: uniqid()});
                            this.presentDate = false; 
                            const presentButton = document.querySelector('.practical-experience-container > form > div:nth-child(5) > span > button');
                            presentButton.removeAttribute('id');
                            presentButton.setAttribute('id', 'present-button-clicked-prac-false');
                        }
                        else if (presentDateComparisonResult === 0)
                        {
                            handleInfo({companyName: companyName, positionTitle: positionTitle, mainTask: mainTask, wStartDate: wStartDate, wEndDate: "Present", isWorkInfo: true, id: uniqid()});
                            this.presentDate = false; 
                            const presentButton = document.querySelector('.practical-experience-container > form > div:nth-child(5) > span > button');
                            presentButton.removeAttribute('id');
                            presentButton.setAttribute('id', 'present-button-clicked-prac-false');
                        }
                    }
                    else
                    {
                        if (wEndDateValidity)
                        {
                            alert("End date must be entered or present button must be clicked.");
                            return;
                        }
                        if (dateComparisonResult === 1)
                        {
                            alert("Invalid Date Input: The start date should come before the end date.");
                            setWEndDateValidity();
                            return;
                        }
                        else if (dateComparisonResult === -1)
                        {
                            handleInfo({companyName: companyName, positionTitle: positionTitle, mainTask: mainTask, wStartDate: wStartDate, wEndDate: wEndDate, isWorkInfo: true, id: uniqid()});
                            setWEndDateValidity();
                        }
                        else if (dateComparisonResult === 0)
                        {
                            handleInfo({companyName: companyName, positionTitle: positionTitle, mainTask: mainTask, wStartDate: wStartDate, wEndDate: wEndDate, isWorkInfo: true, id: uniqid()});
                            setWEndDateValidity();
                        }
                    }
                }}>
                    <div>
                        <label htmlFor="companyName">Company Name</label>
                        <input onChange={handleChange} type="text" name="companyName" id="companyName" required maxLength={50} value={companyName} />
                    </div>

                    <div>
                        <label htmlFor="positionTitle">Position Title</label>
                        <input onChange={handleChange} type="text" name="positionTitle" id="positionTitle" required maxLength={50} value={positionTitle} />
                    </div>

                    <div>
                        <label htmlFor="mainTask">Main Task</label>
                        <input onChange={handleChange} type="text" name="mainTask" id="mainTask" required maxLength={50} value={mainTask} />
                    </div>

                    <div>
                        <label htmlFor="wStartDate">Start Date</label>
                        <input onChange={handleChange} type="date" name="wStartDate" id="wStartDate" required value={wStartDate} />
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