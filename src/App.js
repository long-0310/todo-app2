/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import "./App.css";
import SearchForm from "./Components/searchForm";
import TodoFrom from "./Components/todoFrom";
import TodoList from "./Components/todoList";

const getDataLS = () => {
  const data = localStorage.getItem("listTodo");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(getDataLS());
  const [chooseList, setChoose] = useState([]);
  const [query, setQuery] = useState("");

  function handleOpen() {
    setOpen(!open);
  }

  function handleListTodo(todo) {
    const newTodo = [...list, todo];
    setList(newTodo);
  }

  function handleDeleteTodo(task) {
    const newTasks = list.filter((list) => list.id !== task.id);
    const deleteChoose = chooseList.filter((list) => list.id !== task.id);
    setChoose(deleteChoose);
    setList(newTasks);
  }

  function handleUpdateTodo(todoChange) {
    const newTodo = todoChange;
    const filterList = [...list].map((task) => {
      if (task.id === todoChange.id) {
        return newTodo;
      } else {
        return task;
      }
    });
    setList(filterList);
  }

  function handleSelected(todoChange) {
    if (todoChange.check === false) {
      const newListTodo = [...list].map((value) => {
        if (value.id === todoChange.id) {
          const newTodo = {
            ...todoChange,
            check: !todoChange.check,
          };
          const newChoose = [...chooseList, newTodo];
          setChoose(newChoose);
          return newTodo;
        } else {
          return value;
        }
      });
      return setList(newListTodo);
    }
    const deleteChoose = chooseList.filter((list) => list.id !== todoChange.id);
    setChoose(deleteChoose);
    const newListTodo = [...list].map((value) => {
      if (value.id === todoChange.id) {
        const newTodo = {
          ...todoChange,
          check: !todoChange.check,
        };
        return newTodo;
      } else {
        return value;
      }
    });
    return setList(newListTodo);
  }

  function deleteSelected() {
    const newTask = list.filter((list) => list.check !== true);
    const unCheck = newTask.filter((list) => list.check === true);
    setChoose(unCheck);
    setList(newTask);
  }

  function handleSearch(query) {
    setQuery(query);
  }

  const search = (data) => {
    return data.filter((item) => item.title.toLowerCase().includes(query));
  };

  useEffect(() => {
    localStorage.setItem("listTodo", JSON.stringify(list));
  }, [list]);

  return (
    <div className="sm:mx-auto mt-6">
      <h1 className=" font-bold text-center text-xl mb-3">Task List</h1>
      <div className="text-center  w-full  justify-between sm:flex sm:w-[500px] mx-auto px-5">
        <SearchForm handleSearch={handleSearch} />
        <div className=" sm:w-1/3 ">
          <button
            onClick={handleOpen}
            className="px-3 w-full  py-2 rounded-lg text-white bg-[#2196F3]"
          >
            Create new task
          </button>
        </div>
      </div>
      <div className="sm:w-[700px] mb-24 mt-8 mx-auto ">
        {list && list.length ? (
          ""
        ) : (
          <h2 className="text-center">Let's add what your task ! 👾 </h2>
        )}
        <TodoList
          list={search(list)}
          handleDeleteTodo={handleDeleteTodo}
          handleUpdateTodo={handleUpdateTodo}
          handleSelected={handleSelected}
          chooseList={chooseList}
        />
      </div>

      <div
        className={`${
          open ? "w-full   pt-10   h-full bg-white fixed z-30 top-0" : "hidden"
        }`}
      >
        <TodoFrom handleOpen={handleOpen} handleListTodo={handleListTodo} />
      </div>
      {chooseList.length ? (
        <div className="flex w-full border-t-[1px] bottom-0 h-20 justify-between fixed px-4 sm:px-48  bg-slate-100">
          <div className="my-auto">
            <h2>Bulk Action</h2>
          </div>
          <div className="my-auto flex">
            <button className="px-3 py-2 rounded-lg text-white mr-4 w-24 bg-[#2196F3]">
              Detail
            </button>
            <button
              className="px-3 py-2 rounded-lg text-white w-24 bg-red-600"
              onClick={deleteSelected}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
