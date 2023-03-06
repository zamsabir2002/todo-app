import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';
import Select from './common/select';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-hot-toast';





const Modal = ({ type, showModal, setShowModal, todo }) => {

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("incomplete");

    const dispatch = useDispatch();

    useEffect(() => {
        if (type === 'update' && todo) {
            setTitle(todo.title);
            setStatus(todo.status);
        } else {
            setTitle('');
            setStatus('incomplete');
        }
    }, [type, todo, showModal]);

    const toggleModdle = () => {
        // setStatus("incomplete")
        setTitle("")
        setShowModal(!showModal)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title === "") {
            toast.error("Enter Title")
            return;
        }
        if (type === 'add') {
            dispatch(addTodo({
                id: uuid(),
                title,
                status,
                time: new Date().toLocaleString()
            }))
            toast.success("Task added successfully")
        } else {
            if (todo.title !== title || todo.status !== status) {
                console.log(todo.title)
                dispatch(updateTodo({
                    ...todo,
                    title,
                    status
                }))
            }
            toast.success("Task Updated successfully")
        }
        toggleModdle()

    }
    return (

        <div className="modalBody align-items-center"
            onKeyDownCapture={({ key }) => {
                if (key === 'Escape')
                    setShowModal(!showModal)
            }}
        >
            <div className="modalBackground"
                style={{
                    position: 'absolute',
                    top: '0',
                }}
            >
                <div className='modalContainer'
                    tabIndex={0}
                // onBlur={(e) => {
                //     // if (e.currentTarget === e.target) {
                //     //     console.log('unfocused self');
                //     // } else {
                //     //     console.log('unfocused child', e.target);
                //     // }
                //     if (!e.currentTarget.contains(e.relatedTarget)) {
                //         // Not triggered when swapping focus between children
                //         setShowModal(!showModal)
                //     }
                // }}
                >

                    <div className="body">

                        <h4 className='fw-bold text-center d-inline-block'>
                            {type === 'update' ? "UPDATE " : "ADD "}
                            TASK
                        </h4>
                        <form className='container' onSubmit={(e) => {
                            handleSubmit(e)
                        }}>

                            <label htmlFor="title" className='form-label h6'>Title</label>
                            <input
                                type="text"
                                id='title'
                                value={title}
                                className='form-control mb-2'
                                onChange={(event) => {
                                    setTitle(event.currentTarget.value)
                                }}
                                autoFocus
                            />

                            <Select
                                size="large"
                                label="Status"
                                status={status}
                                setStatus={(arg) => { setStatus(arg) }}
                            />

                            <div className='footer d-flex justify-content-around mt-3'>
                                <button
                                    className='btn btn-primary fw-bold px-4'
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    {type === 'update' ? "Update" : "Add"}
                                </button>

                                <button
                                    className='btn btn-danger fw-bold'
                                    type='button'
                                    onClick={() => {
                                        toggleModdle()
                                    }}
                                >
                                    Cancel
                                </button>


                            </div>

                        </form>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Modal;