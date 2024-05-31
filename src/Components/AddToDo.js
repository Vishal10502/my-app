import React, { useContext, useState } from 'react'
import "./AddToDo.css";
import { TodoContext} from '../Context/TodoContext';
const AddToDo = () => {
  const [AddToDoAction,state] = useContext(TodoContext);
  console.log(state);
    const [title,setTitle] = useState("");
    const handleTitleChange = (e)=>{
        setTitle(e.target.value);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(title===""){
            return alert("please provide details")
        }
        else{
          AddToDoAction(title)
        }
    }
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={handleTitleChange} />
          <button type="submit">Add Todo</button>
        </form>
      </>
    );
};

export default AddToDo;
