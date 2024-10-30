// src/App.js
import React, { useState } from 'react';

const ModalBox = ()=>{
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <button 
        onClick={openModal} 
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Open Modal
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Modal Title</h2>
            <p className="mb-4">This is a simple modal box.</p>
            <button 
              onClick={closeModal} 
              className="bg-red-500 text-white px-4 py-2 rounded">
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalBox;
