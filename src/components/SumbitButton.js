import React, { Component } from "react";
import '../styles/styles.css';

export class SubmitButton extends Component{
    constructor(props){
        super(props);
        this.random = "";
    }

    render(){
        const {isGenInfo} = this.props;
        
        return(
            <div className="submit-button-component-container">
                {isGenInfo ?
                    <button type="sumbit">Save General Info</button>
                    :
                    <button type="submit">Add Info</button>
                }
            </div>
        );
    }
}