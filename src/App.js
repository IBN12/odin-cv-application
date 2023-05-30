/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Program: App.js
// Description: This is the root component file.
// Notes: 1) If you are using state as a prop, then the child needs to have a state also for that prop. 
//
// Assignment: -> Think about how to structure your application into components. Your
// application should include:
// 1) A section to add general information like name, email, phone number. 
// 2) A section to add your educational experience (school name, title of study, date of study)
// 3) A section to add practical experience (company name, position title, main tasks of your jobs, date from
// and until when you worked for that companys)
//
// -> Be sure to include an edit and submit for each section of for the whole CV, your preference. The submit button should
// submit your form and display the value of your input fields in HTML elements. The edit button should add back (display)
// the input fields, with the previously displayed information as values. In those input fields, you should be able to edit
// and resubmit the content. You're going to make heavy use of state and props, so make sure you understood those concepts. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { Component } from "react"
import { GeneralInformation } from "./components/GeneralInformation"
import { EducationalExperience } from "./components/EducationalExperience";
import { DisplayInformation } from "./components/DisplayInformation";
import { PracticalExperience } from "./components/PracticalExperience";

import './styles/styles.css';

// App Class: The root component. 
export default class App extends Component{
    constructor(){
        super();
        this.isEduInfoDisplayed = false;
        this.isWorkInfoDisplayed = false;
        this.isGenInfoFilled = false;
        this.genInfoHasBeenFilled = false;
        this.numOfEduObjs = 0;
        this.numOfWorkObjs = 0;

        this.state={
            name: "",
            email: "",
            phoneNumber: "",
            saveName: "",
            saveEmail: "", 
            savePhoneNumber: "", 
            schoolName: "",
            mainStudy: "",
            startDate: "",
            endDate: "",
            companyName: "",
            positionTitle: "",
            mainTask: "",
            wStartDate: "", 
            wEndDate: "",
            list: [],
        }

        this.handleInfo = this.handleInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeInfo = this.removeInfo.bind(this);
        this.saveGeneralInfo = this.saveGeneralInfo.bind(this);

        this.displayInfo = () => { 
            this.setState({display: true});
            const displayCVButton = document.querySelector('.app-component-container > div:nth-child(2) > button:nth-child(2)');
            const fillCVButton = document.querySelector('.app-component-container > div:nth-child(2) > button:nth-child(1)');
            fillCVButton.removeAttribute('id');
            displayCVButton.setAttribute('id', 'current-viewport');
        }
        this.undisplayInfo = () => {
            this.setState({display: false});
            const displayCVButton = document.querySelector('.app-component-container > div:nth-child(2) > button:nth-child(2)');
            const fillCVButton = document.querySelector('.app-component-container > div:nth-child(2) > button:nth-child(1)');
            displayCVButton.removeAttribute('id');
            fillCVButton.setAttribute('id', 'current-viewport');
        }
    }

    componentDidMount(){
        const fillCVButton = document.querySelector('.app-component-container > div:nth-child(2) > button:nth-child(1)');
        fillCVButton.setAttribute('id', 'current-viewport');
    }

    handleInfo(props){
        if (props.schoolName)
        {
            this.setState({
                list: this.state.list.concat(props),
                schoolName: "",
                mainStudy: "",
                startDate: "",
                endDate: "",
            });
        }
        else if (props.companyName)
        {
            this.setState({
                list: this.state.list.concat(props),
                companyName: "",
                positionTitle: "",
                mainTask: "",
                wStartDate: "",
                wEndDate: "",
            });
        }

        // this.setState({
        //     list: this.state.list.concat(props),
        // });

        if (props.isEduInfo)
        {
            this.isEduInfoDisplayed = true;
            this.numOfEduObjs++;
        }
        else if (props.isWorkInfo)
        {
            this.isWorkInfoDisplayed = true;
            this.numOfWorkObjs++;
        }

        console.log("Number Of Educational Objects In The List: ", this.numOfEduObjs); // Testing
        console.log("Number Of Work Objects In The List: ", this.numOfWorkObjs); // Testing
    }
    
    handleChange(e){

        this.setState({
            [e.target.id] : e.target.value,
        });

        
        console.log("Target: ", e.target); // Testing
        console.log("Length: ", e.target.value.length); // Testing
        if (e.target.value.length > 0 && (e.target.name === "name" || e.target.name === "email" || e.target.name === "phoneNumber"))
        {
            this.isGenInfoFilled = true;
            this.genInfoHasBeenFilled = false;
            console.log("Is Gen Info Displayed: ", this.isGenInfoFilled); // Testing
        }
        else if (e.target.value.length === 0 && (e.target.name === "name" || e.target.name === "email" || e.target.name === "phoneNumber"))
        {
            this.isGenInfoFilled = false;
            
            console.log("Is Gen Info Displayed: ", this.isGenInfoFilled); // Testing
        }
    }

    removeInfo(id, obj){
        console.log("Removing the Info: ", id); // Testing

        if(obj.isEduInfo)
        {
            this.numOfEduObjs--;

            if (this.numOfEduObjs === 0)
            {
                this.isEduInfoDisplayed = false;
            }
        }
        else if (obj.isWorkInfo)
        {
            this.numOfWorkObjs--;

            if (this.numOfWorkObjs === 0)
            {
                this.isWorkInfoDisplayed = false;
            }
        }

        this.setState({
            list: this.state.list.filter(obj => (
                obj.id !== id
            )),
        });

        console.log("Number of Educational Objects In The List: ", this.numOfEduObjs); // Testing
    }

    saveGeneralInfo(props){
        console.log("Saving the general info..."); // Testing
        console.log("Original Name: ", props.name); // Testing
        console.log("Original Email: ", props.email); // Testing
        console.log("Original Phone Number: ", props.phoneNumber); // Testing
        console.log("\n"); // Testing
        console.log("State Name: ", this.state.name); // Testing
        console.log("State Email: ", this.state.email); // Testing
        console.log("State Phone Number: ", this.state.phoneNumber); // Testing

        this.genInfoHasBeenFilled = true;
        this.isGenInfoFilled = false;

        this.setState({
            saveName: props.name,
            saveEmail: props.email,
            savePhoneNumber: props.phoneNumber,
            name: "",
            email: "",
            phoneNumber: "",
        });
    }

    render(){
        return(
            <div className="app-component-container">
                <div>
                    <h1>Curriculumn Vitae</h1>
                </div>
                
                <div>
                    <button onClick={this.undisplayInfo} disabled={!this.state.display}>Fill CV</button>
                    <button onClick={this.displayInfo} disabled={this.state.display}>View Display</button>
                </div>

                {this.state.display ? 
                    <DisplayInformation
                        list={this.state.list}
                        name={this.state.name}
                        email={this.state.email}
                        phoneNumber={this.state.phoneNumber}
                        saveName={this.state.saveName}
                        saveEmail={this.state.saveEmail}
                        savePhoneNumber={this.state.savePhoneNumber}
                        isGenInfoFilled={this.isGenInfoFilled}
                        isEduInfoDisplayed={this.isEduInfoDisplayed}
                        isWorkInfoDisplayed={this.isWorkInfoDisplayed}
                        genInfoHasBeenFilled={this.genInfoHasBeenFilled}
                        removeInfo={this.removeInfo}
                    />
                    :
                    <>
                        <GeneralInformation
                            handleInfo={this.handleInfo}
                            handleChange={this.handleChange}
                            saveGeneralInfo={this.saveGeneralInfo}
                            name={this.state.name}
                            email={this.state.email}
                            phoneNumber={this.state.phoneNumber}
                        />


                        <EducationalExperience
                            handleChange={this.handleChange}
                            handleInfo={this.handleInfo}
                            schoolName={this.state.schoolName}
                            mainStudy={this.state.mainStudy}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            isEduInfoDisplayed={this.IsEduInfoDisplayed}
                        />

                        <PracticalExperience 
                            handleChange={this.handleChange}
                            handleInfo={this.handleInfo}
                            companyName={this.state.companyName}
                            positionTitle={this.state.positionTitle}
                            mainTask={this.state.mainTask}
                            wStartDate={this.state.wStartDate}
                            wEndDate={this.state.wEndDate}
                        />
                    </>
                }



                {/* <GeneralInformation
                    handleInfo={this.handleInfo}
                    handleChange={this.handleChange}
                    name={this.state.name}
                    email={this.state.email}
                    phoneNumber={this.state.phoneNumber}
                /> */}

                {/* <EducationalExperience
                    handleChange={this.handleChange}
                    handleInfo={this.handleInfo}
                    schoolName={this.state.schoolName}
                    mainStudy={this.state.mainStudy}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                /> */}

                {/* // <DisplayInformation
                //     list={this.state.list}
                //     name={this.state.name}
                //     email={this.state.email}
                //     phoneNumber={this.state.phoneNumber}
                // /> */}
            </div>
        );
    }
}