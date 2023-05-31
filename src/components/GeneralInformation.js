import React, { Component } from "react"
import { SubmitButton } from "./SumbitButton";
import '../styles/styles.css';

// GeneralInformation Class: The general information class component. 
export class GeneralInformation extends Component{
    constructor(props){
        super(props);
        this.random = "";
    }

    render(){
        const {name, email, phoneNumber, handleChange, saveGeneralInfo} = this.props

        return(
            <div className="general-information-container">
                <h2>General Information</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();                   
                    saveGeneralInfo({name: name, email: email, phoneNumber: phoneNumber});
                }}>

                    <div>
                        <label htmlFor="name">Name</label>
                        <input  onChange={e => handleChange(e)} type="text" name="name" id="name" required={true} maxLength={50} value={name} />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input onChange={e => handleChange(e)} type="email" name="email" id="email" required={true} maxLength={50} value={email} />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input onChange={e => handleChange(e)} type="tel" name="phoneNumber" id="phoneNumber" pattern="([0-9]{3}|\([0-9]{3}\))-[0-9]{3}-[0-9]{4}" required={true} maxLength={50} value={phoneNumber}  />
                        <p style={{
                            marginTop: "10px",
                            fontSize: "16px",
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