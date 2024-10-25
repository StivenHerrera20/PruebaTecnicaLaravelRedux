<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class WeatherController extends Controller
{
    public function getWeatherCurrent(Request $request)
    {
        // Traigo la Key de openweathermap desde el archivo .env
        $apiKey = env('OPENWEATHER_API_KEY');

        //Parametros de la solicitud
        $countryCode = $request->query('countryCode');
        $city = $request->query('city');
        $temperature = $request->query('temperature');



        $url = "https://api.openweathermap.org/data/2.5/weather?q={$city},{$countryCode}&appid={$apiKey}";

        //Valido si selecciono fahrenheit o celsius para agregarle el parametro units
        if ($temperature == "Fahrenheit") {
            $url = $url . "&units=imperial";
        } else if ($temperature == "Celsius") {
            $url = $url . "&units=metric";
        }

        $response = Http::get($url);

        if ($response->successful()) {
            $data = $response->json();
            $date = date('Y-m-d H:i:s', $data['dt']);

            $formattedTemperature = $data['main']['temp'] . " °" . $temperature[0];
            //Llamamos el procedimiento almacenado para guardar la ciudad en la tabla pronosticoEnc 
            DB::statement('EXEC insertarPronosticoEnc ?', [$city]);
            //Obtenemos el id de la tabla pronosticoEnc
            $result = DB::select('EXEC TraerUltIDPronosticoEnc ');
            $ultIDPronosticoEnc = $result[0]->idPronosticoEnc;
            //Llamamos el procedimiento almacenado para guardar los datos en la tabla pronosticoDet 
            DB::statement('EXEC insertarPronosticoDet ?,?,?,?,? ', [$ultIDPronosticoEnc, $date, $data['weather'][0]['description'], $formattedTemperature, $data['weather'][0]['icon']]);

            return response()->json([
                'city' => $data['name'] . " (" . $data['sys']['country'] . ")",
                'date' => $date,
                'weather' => $data['weather'][0]['description'],
                'temperature' => $data['main']['temp'] . " °" . $temperature[0],
                'icon' => $data['weather'][0]['icon']
            ]);
        } else {
            return response()->json(['error' => 'No se pudo obtener el clima de la ciudad especificada.'], 500);
        }
    }
    public function getWeatherForecast(Request $request)
    {
        // Traigo la Key de openweathermap desde el archivo .env
        $apiKey = env('OPENWEATHER_API_KEY');

        $countryCode = $request->query('countryCode');
        $city = $request->query('city');
        //Cantidad de dias seleccionados por el usuario
        $quantityDays = $request->query('quantityDays');
        //El dia se multiplica por la cantidad de registros diarios (8)
        $quantityDays = $quantityDays * 8;

        //Tipo de temperatura deseada
        $temperature = $request->query('temperature');

        //los grados kelvin vienen por defecto sin llamar el parametro units
        $url = "https://api.openweathermap.org/data/2.5/forecast?q={$city},{$countryCode}&appid={$apiKey}&cnt={$quantityDays}";

        //Valido si selecciono fahrenheit o celsius para agregarle el parametro units
        if ($temperature == "Fahrenheit") {
            $url = $url . "&units=imperial";
        } else if ($temperature == "Celsius") {
            $url = $url . "&units=metric";
        }
        $response = Http::get($url);

        if ($response->successful()) {
            $data = $response->json();
            $forecast = [];
            if ($quantityDays >= 8 && $quantityDays <= 40) {
                DB::statement('EXEC insertarPronosticoEnc ?', [$city]);
                $result = DB::select('EXEC TraerUltIDPronosticoEnc ');
                $ultIDPronosticoEnc = $result[0]->idPronosticoEnc;
                //creamos ciclo que recorra la cantidad de dias para agregar al array los datos traidos de la api externa y poderlos retornar en nuestra api
                for ($i = 0; $i < $quantityDays; $i++) {
                    $forecast[] = [
                        'date' => date('Y-m-d H:i:s', $data['list'][$i]['dt']),
                        'weather' => $data['list'][$i]['weather'][0]['description'],
                        'temperature' => $data['list'][$i]['main']['temp'] . " °" . $temperature[0],
                        'icon' => $data['list'][$i]['weather'][0]['icon']
                    ];
                    $formattedTemperature = $data['list'][$i]['main']['temp'] . " °" . $temperature[0];
                    DB::statement('EXEC insertarPronosticoDet ?,?,?,?,? ', [$ultIDPronosticoEnc, date('Y-m-d H:i:s', $data['list'][$i]['dt']), $data['list'][$i]['weather'][0]['description'], $formattedTemperature, $data['list'][$i]['weather'][0]['icon']]);
                }

                return response()->json([
                    'city' => $data['city']['name'] . " (" . $data['city']['country'] . ")",
                    'forecast' => $forecast,
                ]);
            } else {
                return response()->json(['error' => 'Cantidad de días no válida o excede el rango de los datos.'], 400);
            }
        } else {
            return response()->json(['error' => 'No se pudo obtener el clima de la ciudad especificada.'], 500);
        }
    }
}
