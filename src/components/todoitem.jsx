import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import { useDispatch } from 'react-redux';
import Modal from './modal';

const TodoItem = ({ todo }) => {

    const dispatch = useDispatch();
    const [showUpdateModal, setUpdateModal] = useState(false)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (todo.status === 'complete')
            setChecked(true);
        else
            setChecked(false);
    }, [todo.status]);

    const handleDelete = (todo) => {
        dispatch(deleteTodo(todo.id))
    }

    const handleCheck = () => {
        dispatch(updateTodo({
            ...todo,
            status: checked ? 'incomplete' : 'complete'
        }))
        setChecked(!checked)
    }

    return (
        <>
            <div
                className="border bg-white rounded-2 d-flex justify-content-between shadow-sm p-2 align-items-center"
            >


                {/* Above is the main container */}

                {/* container for content */}
                <div className='d-flex ms-1 text-wrap gap-2 align-items-start'>
                    <div className="form-check">
                        <input
                            className="form-check-input p-2"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            // checked={todo.status === 'complete' ? true : false}
                            onChange={() => handleCheck()}
                            checked={checked}
                        />
                    </div>
                    <div className={todo.status === 'complete' ? "d-flex flex-column text-decoration-line-through fst-italic " : "d-flex flex-column"}>
                        <p
                            className='m-0 text-secondary-emphasis fw-semibold'
                        >{todo.title}</p>
                        <p
                            className='m-0 text-muted fs-6'
                        >{todo.time}</p>
                    </div>
                </div>

                {/* container for buttons */}
                <div
                    className='d-inline-flex justify-content-center align-items-center gap-2 me-1'
                >
                    <FontAwesomeIcon
                        icon={faPen}
                        role="button"
                        className="p-2 shadow-sm bg-dark-subtle rounded-1"
                        onClick={() => {
                            setUpdateModal(!showUpdateModal)
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faTrash}
                        role="button"
                        className="p-2 shadow-sm bg-dark-subtle rounded-1"
                        onClick={() => handleDelete(todo)}
                    />

                </div>
            </div>
            {showUpdateModal &&
                <>
                    <Modal
                        className="border-0"
                        todo={todo}
                        type={"update"}
                        showModal={showUpdateModal}
                        setShowModal={(p) => setUpdateModal(p)}
                    />
                </>
            }
        </>
    );
}

export default TodoItem;


