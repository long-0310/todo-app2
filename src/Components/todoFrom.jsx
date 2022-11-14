import React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

function TodoFrom({ handleOpen, handleListTodo }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const todo = {
      id: uuidv4(),
      isDone: false,
      check: false,
      ...data,
    };
    handleListTodo(todo);
    handleOpen();
    reset();
  };
  function handleClose() {
    reset();
    handleOpen();
  }
  return (
    <div>
      <h1 className=" font-bold text-center text-xl mb-3">New task</h1>
      <div className="sm:w-[700px] mx-4  mt-8 sm:mx-auto ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-medium">Task </h2>
          <input
            id="title"
            placeholder="Add new task"
            className="w-full my-2 px-4 py-3 rounded-lg border-[1px] outline-0 border-b-gray3 mb-2"
            {...register("title", { required: "Title is required." })}
          />
          <p className="text-sm text-red-500 mb-2">{errors.title?.message}</p>

          <h2 className="font-medium">Description</h2>
          <textarea
            id="des"
            rows={4}
            cols={40}
            placeholder="Change your description"
            className="w-full my-2 px-4 py-3 rounded-lg border-[1px] outline-0 border-b-gray3 mb-2"
            {...register("des", { required: "Description is required." })}
          />
          <p className="text-sm text-red-500 mb-2">{errors.des?.message}</p>

          <div className="flex">
            <div className="w-2/4 mr-3">
              <input
                id="date"
                className="w-full h-[52px] my-2 px-4 py-3 rounded-lg border-[1px] mr-3"
                type="date"
                {...register("date", { required: "Date is required." })}
              />
              <p className="text-sm text-red-500 mb-2">
                {errors.date?.message}
              </p>
            </div>
            <div className="w-2/4 mb-2 ">
              <select
                id="select"
                defaultValue="normal"
                className="w-full  h-[52px]  my-2 px-4 py-3 rounded-lg border-[1px] "
                {...register("select", { required: "Select is required." })}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="hight">Hight</option>
              </select>
              <p className="text-sm text-red-500 mb-2">
                {errors.select?.message}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="px-3 py-2 rounded-lg  w-24 border-[1px] border-red-600 bg-white text-red-600 hover:text-white hover:bg-red-600 mr-3"
          >
            Close
          </button>
          <button
            className="px-3 py-2 rounded-lg text-white w-24 bg-[#2196F3]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div></div>
    </div>
  );
}

export default TodoFrom;
