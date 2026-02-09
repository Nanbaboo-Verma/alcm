'use client'
import { useState } from "react";
import { Edit, Trash2 } from "react-feather";

interface Todo {
    id: number;
    text: string;
}

const Result: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState<string>('');
    const [editId, setEditId] = useState<number | null>(null);

    const handleAddTodo = () => {
        if (!input.trim()) return;

        if (editId !== null) {
            setTodos((prev) => 
                prev.map((todo)=>
                    todo.id===editId? {...todo,text:input}:todo
                )
            );
            setEditId(null)

        } else {
            setTodos((prev) => [...prev, { id: Date.now(), text: input }]);
        }
        setInput(' ')
    }

    const handleDelete = (id: number) => {
        setTodos((prev) =>
            prev.filter((item) =>
                item.id !== id
            )
        )
    }

    const handleEdit = (todo: Todo) => {
        setInput(todo.text);
        setEditId(todo.id)
    }


    return <div className="p-8">
        <div className="max-w-96 flex gap-5 items-center mb-5">
            <input
                type="email"
                id="email"
                name="email"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
                onClick={handleAddTodo}
                className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                {editId ? "Update" : "Add"}
            </button>
        </div>

        <ul className="list-disc">
            {todos.map((item, id) => {
                return <li key={id}>{id} {' '} {item.text}
                    <button onClick={()=>handleEdit(item)} className="cursor-pointer"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(item.id)} className="cursor-pointer"><Trash2 size={18} /></button>
                </li>
            })}
        </ul>
    </div>
}

export default Result;