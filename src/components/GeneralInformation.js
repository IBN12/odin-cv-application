import React, { Component } from "react"
import { SubmitButton } from "./SumbitButton";

// GeneralInformation Class: The general information class component. 
export class GeneralInformation extends Component{
    constructor(props){
        super(props);
        this.random = "";
    }

    render(){
        const {name, email, phoneNumber, handleInfo, handleChange, saveGeneralInfo} = this.props

        return(
            <div className="general-information-container">
                <h2>General Information</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Name: ", name); // Testing 
                    console.log("Email: ", email); // Testing   
                    console.log("Phone Number: ",  phoneNumber); // Testing

                    // handleInfo({name: name, email: email, phoneNumber: phoneNumber, isGenInfo: true});
                    saveGeneralInfo({name: name, email: email, phoneNumber: phoneNumber});
                }}>

                    <div>
                        <label htmlFor="name">Name</label>
                        <input onChange={e => handleChange(e)} type="text" name="name" id="name" value={name} />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input onChange={e => handleChange(e)} type="email" name="email" id="email" value={email} />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input onChange={e => handleChange(e)} type="tel" name="phoneNumber" id="phoneNumber" pattern="([0-9]{3}|\([0-9]{3}\))-[0-9]{3}-[0-9]{4}"  value={phoneNumber}  />
                        <p style={{
                            margin: "0px",
                            fontSize: "13px",
                        }}>Phone number entry requirement: (###)-###-#### or ###-###-####</p>
                    </div>

                    <div>
                        <SubmitButton isGenInfo={true} />
                    </div>
                </form>
            </div>
        );
    }
}