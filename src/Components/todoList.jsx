import React, { useState } from "react";

function TodoList({
  list,
  handleDeleteTodo,
  handleUpdateTodo,
  handleSelected,
}) {
  const [updateData, setUpdateData] = useState([]);

  function handleOpenDetail(task, idx) {
    setUpdateData(task);
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
    handleUpdateTodo(updateData);
    setUpdateData([]);
  };

  function handleChooseTodo(task) {
    handleSelected(task);
  }

  return (
    <div>
      {list.map((task, index) => (
        <div key={index} className="rounded-md mx-4  border-[1px] mb-3 p-4">
          <div className="flex justify-between px-5 py-3 ">
            <div className="flex">
              <input
                className="mr-2"
                type="checkbox"
                checked={task.check}
                onChange={() => handleChooseTodo(task)}
              />
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
              <button
                onClick={() => handleDeleteTodo(task)}
                className="px-3 py-2 rounded-lg text-white w-24 bg-red-600"
              >
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
  );
}

export default TodoList;
