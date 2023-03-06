import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './todoitem';



const TodoBody = ({ showModal, setShowModal }) => {

    const todoList = useSelector(state => state.todo.todoList);
    const filterStatus = useSelector(state => state.todo.filterStatus);

    const sortedTodo = [...todoList]
    // sorting with respect to time
    sortedTodo.sort((a, b) => new Date(b.time) - new Date(a.time));

    const filteredTodo = sortedTodo.filter(todo => {
        if (filterStatus === 'all')
            return true
        else
            return todo.status === filterStatus
    })

    return (

        // Container for the overall body
        <div
            className="container d-flex flex-column bg-secondary-subtle py-3 px-2 border border-secondary-subtle rounded-3 overflow-y-auto gap-2"
            style={{
                maxHeight: "280px"
            }}
        >

            {filteredTodo && filteredTodo.length > 0 ?
                filteredTodo.map((todo) =>
                    <TodoItem todo={todo} key={todo.id} />
                ) :
                <p className='bg-secondary p-2 rounded-2 fw-bold text-center p-2 my-0 m-auto'
                >No Todo Yet</p>
            }

        </div>
    );
}

export default TodoBody;