import React from 'react';
import TodoHeader from './todoheader';
import TodoBody from './todobody';


function Todo({ showModal, setShowModal }) {
    return (
        <div className='mx-auto' style={{
            "maxWidth": 750
        }}>
            <TodoHeader
                showModal={showModal}
                setShowModal={(p) => { setShowModal(p) }}
            />
            <TodoBody
                showModal={showModal}
                setShowModal={(p) => { setShowModal(p) }}
            />
        </div>
    );
}

export default Todo;