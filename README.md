<h1>Cómo ejecutar el proyecto frontend y backend:</h1>
Requisitos Previos: <br/>
Node.js <br/>
PHP <br/>
Git <br/>
Composer <br/>
Laravel <br/>
SQL (Yo use SQL Server entonces sera basado en este motor) <br/> <br/>

1. Primero debes clonar el repositorio <br/>
   1.1 Crea una carpeta y abrela con tu ide favorito <br/>
   1.2 Abre la consola y coloca el comando "git init" para iniciar el repositorio local en la carpeta <br/>
   1.3 colocas el comando "git clone https://github.com/StivenHerrera20/PruebaTecnicaLaravelRedux.git" y listo <br/><br/>

2. ejecutar el BackEnd <br/>
   2.1 abrimos la consola y ponemos el siguiente comando "cd .\PruebaTecnicaLaravelRedux\backend" <br/>
   2.2 ahora descargaremos los paquetes con el comando "composer i" <br/>
   2.3 Ajusta la BD entrando al archivo .env en la linea 24 encontraras la configuración de la BD <br/>
   2.4 El script de la BD esta en la raiz del proyecto para que lo crees <br/>
   2.5 cuando configures los datos de la bd en el archivo .env ejecutas en la consola el comando "php artisan migrate" <br/>
   2.6 ahora puedes recorrer los endpoint desde el ide con los sigientes comando "php artisan current {city}{country code}" ejemplo: php artisan current "Madrid" "ES" o el otro endpoint "php artisan forecast {city}{country code} -d{days}" (los dias tienen un maximo de 5) ejemplo: php artisan forecast "Bogota" "CO" -d3 -tCelsius <br/>
   2.7 ahora encenderemos la api: debes colocar el comando "php artisan serve" y listo, tenemos el backend funcionando <br/><br/>

3. ejecutar el FrontEnd <br/>
   3.1 abrimos otra pestaña de la consola y colocamos el comando "cd .\PruebaTecnicaLaravelRedux\frontend" <br/>
   3.2 instalamos los paquetes con el comando "npm i" <br/>
   3.3 iniciamos el frontend con el comando "npm run dev" y listo, tenemos el frontend funcionando <br/><br/>

<h1> Como obtener y configurar la API Key de OpenWeatherMap: </h1>
<br/>
1. ingresamos a la pagina de la api : https://openweathermap.org/api <br/>
2. creamos una cuenta en la pagina de OpenWeatherMap <br/>
3. cuando crees la cuenta recibiras un correo electronico para verificar tu email, le das click en el boton de "Verify email" <br/>
4. ahora debes ingresar a la seccion que dice "API keys" o ve directamente a la Url https://home.openweathermap.org/api_keys <br/>
5. obtendras una tabla y abajo de donde dice Key estara tu Api Key <br/>
6. Ahora regresa al proyecto y entra en el archivo .env en la linea 69 colocas tu Api Key y listo el proyecto ya funciona con tu propia API KEY
<br/><br/>
<h1>Cómo consumir los endpoints desde el frontend:</h1>
<br/><br/>
Es sencillo ten en cuenta que debes de tener iniciado el frontend y el backend, entras en la URL del frontend "http://localhost:5173/" y veras 2 inputs (Ciudad y Código del Pais) y 2 selects (Tipo pronóstico y Grados) para ejecutar el endpoint /api/weather/current debes de seleccionar "Simple" en el campo Tipo de Pronostico y llenar el resto de datos, cuando llenes todos los datos le das en el boton "Enviar" y listo, tendras el clima actual. Para ejecutar el endpoint /api/weather/forecast debes seleccionar algun numero (los numeros hace referencia a los dias) del campo Tipo de Pronostico y llenar el resto de datos, a continuacion le das en el boton "enviar" y obtendras las predicciones de la cantidad de dias seleccionados
