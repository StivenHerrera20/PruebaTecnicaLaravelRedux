import React from 'react';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Card from './components/Card';
import { useSelector } from 'react-redux';

function App() {
    const submitted = useSelector((state) => state.form.submitted); 

    return (    
        <div className='bg-neutral-200 dark:bg-gray-800 py-3'>
            <div className="w-10/12 mx-auto text-center py-14">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
                    CONSULTAR EL CLIMA
                </h1> 
            </div>  
            <Navbar />
            <div className="w-8/12 mx-auto">
                <Form />
            </div>
            <div className="mt-7 w-10/12 mx-auto ">
            {submitted && <Card />}
            </div>
        </div>
    );
}

export default App;
