import React from 'react';
import { useSelector } from 'react-redux';
import Select from './common/select';

function TodoHeader({ showModal, setShowModal }) {


    return (
        <div className="d-flex justify-content-between">
            <button
                className='btn btn-primary fw-bold mb-3'
                onClick={() => {
                    setShowModal(!showModal)
                }}
            >Add Task</button>
            <Select
                size={"small"}
                label={null}
            />
        </div>
    );
}

export default TodoHeader;