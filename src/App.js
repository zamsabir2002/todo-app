// import logo from './logo.svg';
import Todo from './components/todo';
import Modal from './components/modal';
import './App.css';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>

      {showModal && <Modal
        type="add"
        showModal={showModal}
        setShowModal={(p) => setShowModal(p)}
      />}
      <div className='container'>
        <h1 className='text-center fw-bold mt-4'>
          TODO LIST
        </h1>
        <Todo
          showModal={showModal}
          setShowModal={(p) => { setShowModal(p) }} />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem'
          }
        }}
      />
    </>
  );
}

export default App;
