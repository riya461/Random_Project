import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

interface ToDoProps {
  id: number;
  title: string;
  description: string;
  complete: boolean;
  mongoId: string;
  deleteTodo: (id: string) => void; // Function to delete a to-do
  completeTodo: (id: string) => void; // Function to mark a to-do as complete
}

const ToDo: React.FC<ToDoProps> = ({ id, title, description, complete, mongoId, deleteTodo, completeTodo }) => {
  return (
    <tr key={mongoId}>
      <td className="px-3 py-3">{id}</td>
      <td className="px-3 py-3">{title}</td>
      <td className="px-3 py-3">{description}</td>
      <td className="px-3 py-3">{complete ? "Completed" : "Pending"}</td>
      <td className="px-3 py-3 flex">
        <button onClick={() => deleteTodo(mongoId)} className="py-2 px-4 mx-2 w-1/2 bg-red-500 text-white">
          <MdDelete />
        </button>
        <button onClick={() => completeTodo(mongoId)} className="py-2 px-4 mx-2 w-1/2 bg-green-500 text-white">
          <FaCheckCircle />
        </button>
      </td>
    </tr>
  );
};

export default ToDo;
