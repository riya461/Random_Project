"use client";

import ToDo from "@/components/ToDo";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToDoItem {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export default function Home() {
  interface FormData {
    title: string;
    description: string;
    [key: string]: string; // This allows any additional string fields
  }

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState<ToDoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api');
      setTodoData(response.data.todo);
    } catch (error) {
      console.error("Error fetching to-dos:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await axios.delete('/api', {
        params: {
          mongoId: id,
        },
      });
      toast.success(response.data.msg);
      fetchData();
    } catch (error) {
      toast.error("Failed to delete to-do");
    }
  };

  const completeTodo = async (id: string) => {
    try {
      const response = await axios.put('/api', {}, {
        params: {
          mongoId: id,
        },
      });
      toast.success(response.data.msg);
      fetchData();
    } catch (error) {
      console.log(error)
      toast.error("Error: Not marked!");
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({
      ...form,
      [name]: value,
    }));
    console.log(formData);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (formData.title === "") {
      toast.error("The title is empty");
    } else {
      try {
        const response = await axios.post('/api', formData);
        toast.success(response.data.msg);
        setFormData({
          title: "",
          description: "",
        });
        fetchData();
      } catch (error) {
        console.error("Error adding to-do:", error);
      }
    }
  };

  return (
    <main className="flex mb-5 flex-col items-center justify-between p-24">
      <ToastContainer theme="dark" />
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] px-2 mx-auto" action="" method="">
        <input
          id="title"
          value={formData.title}
          onChange={onChangeHandler}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 text-black font-mono w-full"
        />
        <textarea
          id="desc"
          value={formData.description}
          onChange={onChangeHandler}
          name="description"
          placeholder="Enter Description..."
          className="px-3 py-2 border-2 w-full text-black font-mono text-sm"
        />
        <button type="submit" className="bg-gray-600 py-2 px-3 text-white border-circle font-sans font-semibold">Add To-do</button>
      </form>

      <div className="mt-5">
        <h3 className="text-2xl font-sans underline">The To-Dos</h3>
        <br />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table-fixed text-white">
            <thead>
              <tr className="uppercase">
                <th>ID <hr /></th>
                <th>Title <hr /></th>
                <th>Description <hr /></th>
                <th>Status <hr /></th>
                <th>Actions <hr /></th>
              </tr>
            </thead>
            <tbody>
              {todoData.map((item, index) => (
                <ToDo key={item._id} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} completeTodo={completeTodo} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
