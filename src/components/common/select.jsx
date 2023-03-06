import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterStatus } from '../../slices/todoSlice';


const Select = ({ size, label, status, setStatus }) => {
    const classes = size === 'small' ? 'btn btn-secondary fw-bold mb-3' : "form-select";

    const dispatch = useDispatch();
    const filterStatus = useSelector(state => state.todo.filterStatus)

    const handleChange = (e) => {
        dispatch(updateFilterStatus(e.target.value))
    }
    return (
        <>
            {label && <label htmlFor='status' className='form-label h6'>{label}</label>}
            <select
                name="status"
                id="status"
                className={classes}
                value={size === 'small' ? filterStatus : status}
                onChange={(e) => {
                    if (size !== "small")
                        setStatus(e.currentTarget.value)
                    else
                        handleChange(e)
                }}
            >
                {size === "small" && <option value="all" className='text-start'>All</option>}
                <option value="incomplete" className='text-start'>Incomplete</option>
                <option value="complete" className='text-start'>Complete</option>
            </select>
        </>
    );
}

export default Select;