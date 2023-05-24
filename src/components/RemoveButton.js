import React, {Component} from "react";

// RemoveButton Class: Will remove user cv info from the list.
export class RemoveButton extends Component{
    constructor(props){
        super(props);
        this.random = "";
    }

    render(){
        const {removeInfo, id, obj} = this.props;

        return(
            <div>
                <button onClick={()=>removeInfo(id, obj)}>Remove Info</button>
            </div>
        );
    }
}