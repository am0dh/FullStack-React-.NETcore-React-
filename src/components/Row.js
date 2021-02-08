import React from 'react';

const Row=(props)=>{

    const edit=()=>{
        var edited=prompt("make the changes",props.task)
        if(edited!=="" || edited!==null || edited!==props.task){
            var theObj={id:props.id,todoTask:edited,done:props.done}
        props.editHandler(theObj);
        }
    }

    const doneHandler=()=>{
        var theObj={id:props.id,todoTask:props.task,done:props.done}
        if(props.done===1){
            theObj.done=0
        }
        else if(props.done===0){
            theObj.done=1
        }
        props.editHandler(theObj)
    }
    
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.task}</td>
            <td><input type="button"  value={props.done?"done":"not done"} onClick={doneHandler}/></td>
            <td>
                <input type="button" value="edit" onClick={edit}/>
                <input type="button" value="delete" onClick={()=>props.delthandler(props.id)}/>
            </td>
        </tr>
    );
}

export default Row;