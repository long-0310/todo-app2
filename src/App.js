/* eslint-disable array-callback-return */
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import TodoFrom from "./Components/todoFrom";

function App() {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [list, setList] = useState([]);

  const handleChecked = (data) => {
    setChecked(!checked);
    console.log(checked);
  };

  function handleOpen() {
    setOpen(!open);
  }
  function handleOpenDetail(task, idx) {
    setUpdateData(task);
  }
  function handleListTodo(todo) {
    const newTodo = [...list, todo];

    setList(newTodo);
  }
  const changeTitle = (e) => {
    let newEntry = {
      ...updateData,
      title: e.target.value,
    };
    setUpdateData(newEntry);
  };

  const changeDes = (e) => {
    let newEntry = {
      ...updateData,
      des: e.target.value,
    };
    setUpdateData(newEntry);
  };

  const changeDate = (e) => {
    let newEntry = {
      ...updateData,
      date: e.target.value,
    };
    setUpdateData(newEntry);
  };

  const changeSelect = (e) => {
    let newEntry = {
      ...updateData,
      select: e.target.value,
    };
    setUpdateData(newEntry);
  };

  function handleCancel(e) {
    setUpdateData([]);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(updateData);
    setUpdateData([]);
  };

  return (
    <div className="mx-auto mt-6">
      <h1 className=" font-bold text-center text-xl mb-3">To do List</h1>
      <div className="text-center">
        <button
          onClick={handleOpen}
          className="px-3 py-2 rounded-lg text-white mr-4  bg-[#2196F3]"
        >
          create new todo
        </button>
      </div>
      <div className="w-[700px] mt-8 mx-auto">
        {list && list.length ? "" : "Let's add what you have to do ! 😎"}

        {list.map((task, index) => (
          <div key={index} className="rounded-md  border-[1px] mb-3 p-4">
            <div className="flex justify-between px-5 py-3 ">
              <div className="flex">
                <input className="mr-2" type="checkbox" />
                <h2 className=" my-auto">{task.title} </h2>
              </div>
              <div>
                <button
                  className="px-3 py-2 rounded-lg text-white mr-4 w-24 bg-[#2196F3]"
                  onClick={() => {
                    handleOpenDetail(task, index);
                  }}
                >
                  Detail
                </button>
                <button className="px-3 py-2 rounded-lg text-white w-24 bg-red-600">
                  Remove
                </button>
              </div>
            </div>
            {updateData.id === task.id && (
              <div className="border-t-[1px] ">
                <form className="mt-4" onSubmit={onSubmit}>
                  <input
                    id="title"
                    type="text"
                    value={updateData.title}
                    className="w-full my-2 px-4 py-3 rounded-lg border-[1px] outline-0 border-b-gray3 mb-2"
                    onChange={(e) => changeTitle(e)}
                  />
                  <p className="text-sm text-red-500 mb-2"></p>
                  <h2 className="font-medium">Description</h2>
                  <textarea
                    id="des"
                    defaultValue={updateData.des}
                    rows={4}
                    cols={40}
                    placeholder="Change your description"
                    onChange={(e) => changeDes(e)}
                    className="w-full my-2 px-4 py-3 rounded-lg border-[1px] outline-0 border-b-gray3 mb-2"
                  />
                  <div className="flex">
                    <div className="w-2/4 mr-3">
                      <input
                        id="date"
                        defaultValue={updateData.date}
                        onChange={(e) => changeDate(e)}
                        className="w-full h-[52px] my-2 px-4 py-3 rounded-lg border-[1px] mr-3"
                        type="date"
                      />
                    </div>
                    <div className="w-2/4 mb-2 ">
                      <select
                        id="select"
                        onChange={(e) => changeSelect(e)}
                        defaultValue={updateData.select}
                        className="w-full  h-[52px]  my-2 px-4 py-3 rounded-lg border-[1px] "
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="hight">Hight</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className=" px-3 py-2 rounded-lg  border-[1px] border-red-600 bg-white text-red-600 hover:text-white hover:bg-red-600 mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      // onClick={handleCancel}
                      type="submit"
                      className=" px-3 py-2 rounded-lg text-white  bg-[#2196F3] mr-3"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <div className="flex w-full border-t-[1px] bottom-0 h-20 justify-between fixed px-48 bg-slate-100">
        <div className="my-auto">
          <h2>Bulk Action</h2>
        </div>
        <div className="my-auto">
          <button className="px-3 py-2 rounded-lg text-white mr-4 w-24 bg-[#2196F3]">
            Detail
          </button>
          <button className="px-3 py-2 rounded-lg text-white w-24 bg-red-600">
            Remove
          </button>
        </div>
      </div> */}
      <div
        className={`${
          open ? "w-full  pt-10   h-full bg-white fixed z-30 top-0" : "hidden"
        }`}
      >
        <TodoFrom handleOpen={handleOpen} handleListTodo={handleListTodo} />
      </div>
    </div>
  );
}

export default App;
