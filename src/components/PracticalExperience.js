import React, { Component } from "react";
import { SubmitButton } from "./SumbitButton";
import uniqid from "uniqid";

// PracticalExperience Class:
export class PracticalExperience extends Component{
    constructor(props){
        super(props)
        this.presentDate = false;
        this.endPresentDate = this.endPresentDate.bind(this);
    }

    endPresentDate(){
        console.log("End Present Date Function For Work Experience..."); // Testing
        if (this.presentDate === false)
        {
            this.presentDate = true;
            console.log("Present Date Work Experience: ", this.presentDate); // Testing
        }
        else if(this.presentDate === true)
        {
            this.presentDate = false;
            console.log("Present Date Work Experience: ", this.presentDate); // Testing
        }
    }

    render(){
        const {handleChange, handleInfo, companyName, positionTitle, mainTask, wStartDate, wEndDate} = this.props;

        return(
            <div>
                <h2>Work Experience</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Company Name: ", companyName); // Testing
                    console.log("Position Title: ", positionTitle); // Testing 
                    console.log("Main Task: ", mainTask); // Testing
                    console.log("Work Start Date: ", wStartDate); // Testing
                    console.log("Work End Date: ", wEndDate); // Testing

                    if (this.presentDate)
                    {
                        handleInfo({companyName: companyName, positionTitle: positionTitle, mainTask: mainTask, wStartDate: wStartDate, wEndDate: "Present", isWorkInfo: true, id: uniqid()});
                        this.presentDate = false; 
                    }
                    else
                    {
                        handleInfo({companyName: companyName, positionTitle: positionTitle, mainTask: mainTask, wStartDate: wStartDate, wEndDate: wEndDate, isWorkInfo: true, id: uniqid()})
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
                        <span><input onChange={handleChange} type="date" name="wEndDate" id="wEndDate" disabled={this.presentDate} value={wEndDate} /> <button type="button" onClick={this.endPresentDate}>Present</button></span>
                    </div>
                    
                    <div>
                        <SubmitButton/>
                    </div>
                </form>

            </div>
        );
    }
}