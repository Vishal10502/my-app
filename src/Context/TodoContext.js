import React, { useReducer, createContext, useEffect } from "react";

//instance of createCOntext

export const TodoContext = createContext();

//Getting data from local storage

// const getdata = () => {
//   const todos = localStorage.getItem("todos");
//   if (todos) {
//     return JSON.parse(todos);
//   }
//   return [];
// };
function getTodos() {
  const todosData = localStorage.getItem('todos'); // Assuming you're getting the data from localStorage

  try {
    const todos = JSON.parse(todosData);
    return todos;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    console.log('Received data:', todosData); // Log the data to see what went wrong
    return []; // Return an empty array or a default value to avoid breaking your app
  }
}

//Create initial state
const initialState = getTodos;



//Create Reducer function

const toDoReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TODO":
      return [...state, payload];
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== payload);
    default:
      return state;
  }
};


//exporting provider func.
export const TodoContextProvider = ({Children}) => {
  //UseReducer
  //todos is the state
  const [todos, dispatch] = useReducer(toDoReducer, initialState);

  //saving to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //Addtodo action

  const AddToDoAction = (title) => {
    dispatch({
      type: "ADD_TODO",
      payload: {
        id: todos.length + 1,
        title,
      },
    });
  };

  //remove todoaction
  const removeToDoAction = (id) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: id,
    });
  };
  return (
    <>
      <TodoContext.Provider value={{ todos, AddToDoAction, removeToDoAction }}>
        {Children}
      </TodoContext.Provider>
    </>
  );
};
