import React from 'react'; 
import { useSelector } from 'react-redux';

const Card = () => {
  const formData = useSelector((state) => state.form);
  const { current, forecast, loading, error } = useSelector((state) => state.weather);

  if (loading) return <p className="text-center text-lg font-semibold text-gray-900 dark:text-gray-200">Cargando...</p>;
  if (error) return <p className="text-center text-lg font-semibold text-red-500 dark:text-red-400">Error: {error}</p>;

  return (
    <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-6 mt-6">
      {formData.forecastType === 'Simple' && current && (
        <>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Clima Actual en {current.city}</h2>
          <div className="col-end-2 flex">
            <div className="col-span-1">
              <img src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`} alt="" />
            </div>
            <div className="col-span-1">
              <p className="text-lg text-gray-700 dark:text-gray-300"><span className="font-medium">Fecha:</span> {current.date}</p>
              <p className="text-lg text-gray-700 dark:text-gray-300"><span className="font-medium">Descripción:</span> {current.weather}</p>
              <p className="text-lg text-gray-700 dark:text-gray-300"><span className="font-medium">Temperatura:</span> {current.temperature}</p>
            </div>
          </div>
        </>
      )}
      {formData.forecastType !== 'Simple' && forecast?.forecast?.length > 0 && (
        <>
          <h3 className="text-xl text-center font-semibold text-gray-900 dark:text-gray-200 mb-2 py-3">Previsión para los próximos días {forecast.forecast.length / 8} en {forecast.city}</h3>
          <div className="space-y-4">
            {forecast.forecast.map((day, index) => (
              <div key={index} className="bg-neutral-200 dark:bg-slate-600 rounded-md p-4 col-end-2 flex">
                <div className="col-span-1">
                  <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt="" />
                </div>
                <div className="col-span-1">
                  <p className="text-md text-gray-800 dark:text-gray-300"><span className="font-medium">Fecha:</span> {day.date}</p>
                  <p className="text-md text-gray-800 dark:text-gray-300"><span className="font-medium">Descripción:</span> {day.weather}</p>
                  <p className="text-md text-gray-800 dark:text-gray-300"><span className="font-medium">Temperatura:</span> {day.temperature}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
