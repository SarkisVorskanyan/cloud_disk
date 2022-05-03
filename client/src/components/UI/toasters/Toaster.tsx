import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const Toaster = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            theme='colored'
        />
    )
}

export default Toaster