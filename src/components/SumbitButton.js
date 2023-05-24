import React, { Component } from "react";

export class SubmitButton extends Component{
    constructor(props){
        super(props);
        this.random = "";
    }

    render(){
        const {isGenInfo} = this.props;
        
        return(
            <div>
                {isGenInfo ?
                    <button type="sumbit">Save General Info</button>
                    :
                    <button type="submit">Add Info</button>
                }
            </div>
        );
    }
}