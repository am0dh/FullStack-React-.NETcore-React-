import { useEffect, useState } from "react";
import "./App.css";
import Row from "./components/Row"

function App() {
  const [todosState,setTodosState] = useState([]);

 const editHandler=(obj)=>{
  let request = fetch('https://localhost:44389/api/Todo', {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  location.reload();
  }

const delHandler=(id)=>{
  var confrm=confirm("Are you sure you wanna delete this?");
  if(confrm){
    fetch(`https://localhost:44389/api/Todo/${id}`, {
      method: "DELETE",
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    location.reload();
  }
}

const addHandler=()=>{
 var newTask= prompt("Enter the task");
 if(newTask!==null || newTask.length!==0){
    let data={todoTask:newTask,done:0}
    let request = fetch('https://localhost:44389/api/Todo', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    location.reload();
 }
}

const statusHandler=(id)=>{

}
const  getTasks=async ()=>{
    var tasks= await fetch("https://localhost:44389/api/Todo");
    tasks=await tasks.json();
    console.log(tasks);
    setTodosState([...tasks])
}
useEffect(()=>{
  getTasks()

},[])

  return (
    <div className="App" style={{margin:"40px",border:"1px solid lightgrey",borderRadius:"10px",padding:"10px"}}>
      <input type="button" value="Add task" onClick={addHandler}/>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Task Id</th>
            <th scope="col">Task</th>
            <th scope="col">Status</th>
            <th scope="col">Actions </th>
          </tr>
        </thead>
        <tbody>

        {todosState.map(item=><Row id={item.id} 
        key={item.id} 
        task={item.todoTask} 
        done={item.done} 
        delthandler={delHandler} 
        statusHandler={statusHandler}
        editHandler={editHandler}   />)}

        </tbody>
      </table>
    </div>
  );
}

export default App;
