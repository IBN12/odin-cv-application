import React, { Component } from "react";
import { RemoveButton } from "./RemoveButton";

// DisplayInformation(): The display information class component.  
export class DisplayInformation extends Component{
    constructor(props){
        super(props);
        this.random = "";
    }

render(){
    const {list, name, email, phoneNumber, saveName, saveEmail, savePhoneNumber, removeInfo, isGenInfoFilled, isEduInfoDisplayed, isWorkInfoDisplayed, genInfoHasBeenFilled} = this.props;

    return (
        <div className="display-information-container">
            <div>
                <h2>General Information Display</h2>
                {isGenInfoFilled ? 
                    <>
                        <p>Name: {name}</p>
                        <p>Email: {email}</p>
                        <p>Phone Number: {phoneNumber}</p>
                    </>
                    :
                    <>
                    {genInfoHasBeenFilled ?
                        <>
                            <p>Name: {saveName}</p>
                            <p>Email: {saveEmail}</p>
                            <p>Phone Number: {savePhoneNumber}</p>
                        </>
                        :
                        <p>No general information has been filled.</p>
                    }
                    </>
                }

                {/* <button onClick={this.saveGeneralInfo}>Save General Info</button> */}
                {/* {this.genInfoSaved ?
                    <div>
                        <p>Name: {this.state.saveName}</p>
                        <p>Email: {this.state.saveEmail}</p>
                        <p>Phone Number: {this.state.savePhoneNumber}</p>
                    </div>
                    :
                    <p>No general information has been saved.</p>
                } */}
            </div>

            <div>
                <h2>Educational Experience Display</h2>
                {isEduInfoDisplayed ?
                    <>
                        {list.map((obj) => {
                            return (
                                <div key={obj.id}>
                                    {obj.isEduInfo ?
                                        <>
                                            <p>School Name: {obj.schoolName}</p>
                                            <p>Main Study: {obj.mainStudy}</p>
                                            <p>Start Date: {obj.startDate}</p>
                                            <p>End Date: {obj.endDate}</p>
                                            <p>Object Id: {obj.id}</p>
                                            <RemoveButton 
                                                removeInfo={removeInfo}
                                                id={obj.id}
                                                obj={obj}
                                            />
                                        </>
                                        :
                                        null
                                    }
                                </div>
                            );
                        })}
                    </>
                    :
                    <p>No educational info has been filled.</p>
                }
            </div>

            <div>
                <h2>Work Experience Display</h2>
                {isWorkInfoDisplayed ?
                    <>
                        {list.map((obj) => {
                            return (
                                <div key={obj.id}>
                                    {obj.isWorkInfo ?
                                        <>
                                            <p>Company Name: {obj.companyName}</p>
                                            <p>Position Title: {obj.positionTitle}</p>
                                            <p>Main Task: {obj.mainTask}</p>
                                            <p>Start Date: {obj.wStartDate}</p>
                                            <p>End Date: {obj.wEndDate}</p>
                                            <RemoveButton
                                                removeInfo={removeInfo}
                                                id={obj.id} 
                                                obj={obj}
                                            />
                                        </>
                                        :
                                        null
                                    } 
                                </div>
                            );
                        })}  
                    </>
                    :
                    <p>No work info has been filled.</p>
                }
            </div>

        </div>
    );
}
}