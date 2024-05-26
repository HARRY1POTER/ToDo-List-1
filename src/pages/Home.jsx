import React, { useState, useEffect } from "react";

function TodoList() {
  const [todoText, setTodoText] = useState("");
  const [editIndex, setEditIndex] = useState("");
  const [todoList, setTodoList] = useState(() => {
    const savedList = JSON.parse(localStorage.getItem("todoList"));
    return savedList ? savedList : [];
  });
  const [editMode, setEditMode] = useState(false);
  const [sortByCompleted, setSortByCompleted] = useState(false);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("todoList"));
    if (savedList) {
      setTodoList(savedList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim() !== "") {
      if (editMode && editIndex !== "") {
        const tempList = [...todoList];
        tempList[editIndex].text = todoText;
        setTodoList(tempList);
        setEditMode(false);
        setEditIndex("");
      } else {
        setTodoList([...todoList, { text: todoText, completed: false }]);
      }
      setTodoText("");
    }
  };

  const handleEdit = (index) => {
    setTodoText(todoList[index].text);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filteredList = todoList.filter((todo, i) => i !== index);
    setTodoList(filteredList);
  };

  const handleToggleComplete = (index) => {
    const newList = [...todoList];
    newList[index].completed = !newList[index].completed;
    setTodoList(newList);
  };

  const handleSortByCompleted = () => {
    setSortByCompleted((prevSortByCompleted) => {
      const newSortByCompleted = !prevSortByCompleted;
      setTodoList((prevList) =>
        prevList.slice().sort((a, b) => {
          if (newSortByCompleted) {
            return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
          } else {
            return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
          }
        })
      );
      return newSortByCompleted;
    });
  };

  return (
    <div className="p-10 text-center justify-center flex">
      <div className="flex flex-col items-center pb-10 container bg-purple-200 rounded-3xl">
        <div className="max-w-md w-full mt-10 p-8 mb-8">
          <h2 className="text-5xl font-bold text-center mb-6">Todo List</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center mt-16 space-y-4 md:space-y-0 md:space-x-4"
          >
            <div className="flex flex-wrap w-full md:w-auto px-4 mb-4">
              <label htmlFor="todoText" className="sr-only">
                Todo Item
              </label>
              <input
                type="text"
                id="todoText"
                value={todoText}
                onChange={handleChange}
                className="w-full md:w-auto px-4 py-2 border-b border-gray-600 placeholder-gray-600  bg-transparent"
                placeholder="Enter your todo item"
                aria-label="Enter your todo item"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 transition-colors duration-300"
              >
                {editMode ? "Update" : "Add Todo"}
              </button>
            </div>
          </form>
        </div>

        <div className="max-w-6xl w-full p-8 ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-5xl font-bold">Todo Items</h2>
            <button
              onClick={handleSortByCompleted}
              className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 lg:w-auto bg-primary-500 dark:bg-primary-400 shadow-primaryShadow mb-1 hover:bg-primary-600 dark:hover:bg-primary-300 hover:shadow-primaryHover active:shadow-primaryActive transition-all duration-150 active:translate-y-2 items-center justify-center font-semibold text-inline border-blue-950 active:border-transparent border-b-8 select-none focus:outline-none inline-flex"
            >
              {sortByCompleted ? "Sort by complete" : "Sort by InComplete"}
            </button>
          </div>
          <div className="overflow-x-auto">
            <ul className="w-full">
              {sortByCompleted
                ? todoList
                    .sort((a, b) =>
                      a.completed === b.completed ? 0 : a.completed ? -1 : 1
                    )
                    .map((todo, index) => (
                      <li
                        key={index}
                        className={`flex text-lg bg-gray-200 p-5 rounded-3xl mb-5 justify-between items-center border-b py-4 ${
                          todo.completed ? "text-gray-500 line-through " : ""
                        }`}
                      >
                        <span>{todo.text}</span>
                        <div>
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-2xl mr-4 hover:bg-green-600 transition-colors duration-300 m-2"
                            onClick={() => handleToggleComplete(index)}
                          >
                            {todo.completed ? "Undo" : "Done"}
                          </button>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-2xl mr-4 hover:bg-blue-600 transition-colors duration-300 m-2"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition-colors duration-300 m-2"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))
                : todoList.map((todo, index) => (
                    <li
                      key={index}
                      className={`flex text-lg justify-between items-center border mb-5 bg-gray-200 p-5 rounded-3xl py-4 ${
                        todo.completed ? "text-gray-500 line-through" : ""
                      }`}
                    >
                      <span>{todo.text}</span>
                      <div>
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-2xl mr-4 hover:bg-green-600 transition-colors duration-300 m-2"
                          onClick={() => handleToggleComplete(index)}
                        >  
                          {todo.completed ? "Undo" : "Done"}
                        </button>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-2xl mr-4 hover:bg-blue-600 transition-colors duration-300 m-2"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition-colors duration-300 m-2"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;


