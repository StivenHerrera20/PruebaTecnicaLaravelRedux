import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm, submitForm } from '../store/Slices/formSlice';
import { fetchCurrentWeather, fetchWeatherForecast } from '../store/Slices/weatherSlice';

const Form = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateForm({ name, value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Despacha la acción adecuada según el tipo de pronóstico
        if (formData.forecastType === 'Simple') {
            dispatch(fetchCurrentWeather(formData));
        } else if (['1', '2', '3', '4', '5'].includes(formData.forecastType)) {
            const quantityDays = parseInt(formData.forecastType);
            dispatch(fetchWeatherForecast({
                city: formData.city,
                countryCode: formData.countryCode,
                quantityDays,
                temperature: formData.temperature,
                icon: formData.icon,
            }));
        }
        
        // Marca el formulario como enviado
        dispatch(submitForm());
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Inputs de Ciudad, Código País, Tipo de Pronóstico, y Select Grados */}
                    <div className="sm:col-span-2">
                        <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200">Ciudad</label>
                        <input 
                            type="text" 
                            name="city" 
                            id="city" 
                            placeholder="Pamplona" 
                            onChange={handleChange} 
                            className="ps-3 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-200 dark:bg-slate-600"
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="countryCode" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200">Código del País</label>
                        <input 
                            type="text" 
                            name="countryCode" 
                            id="countryCode" 
                            placeholder="ES" 
                            onChange={handleChange} 
                            className="ps-3 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-200 dark:bg-slate-600"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="forecastType" className="mb-2 ms-1 block text-sm font-medium text-gray-900 dark:text-gray-200">Tipo pronóstico (Un solo dato o Días)</label>
                        <select 
                            id="forecastType" 
                            name="forecastType" 
                            onChange={handleChange} 
                            className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 dark:text-gray-200 dark:bg-slate-600"
                        >
                            <option >Simple</option>
                            <option >1</option>
                            <option >2</option>
                            <option >3</option>
                            <option >4</option>
                            <option >5</option>
                        </select>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="temperature" className="mb-2 ms-1 block text-sm font-medium text-gray-900 dark:text-gray-200">Grados</label>
                        <select 
                            id="temperature" 
                            name="temperature" 
                            onChange={handleChange} 
                            className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 dark:text-gray-200 dark:bg-slate-600"
                        >
                            <option>Kelvin</option>
                            <option>Fahrenheit</option>
                            <option>Celsius</option>
                        </select>
                    </div>
                </div>
            </div>
            <button type="submit" className="mt-8 w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:from-teal-400 dark:via-teal-500 dark:to-teal-600">Enviar</button>
        </form>
    );
};

export default Form;
