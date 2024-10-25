<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class current extends Command
{
    protected $signature = 'current {city} {countryCode} {temperature=Kelvin}';
    protected $description = 'Obtener el clima actual de una ciudad';

    public function handle()
    {
        $city = $this->argument('city');
        $countryCode = $this->argument('countryCode');
        $temperature = $this->argument('temperature');

        // Traigo la Key de openweathermap desde el archivo .env
        $apiKey = env('OPENWEATHER_API_KEY');
        $url = "https://api.openweathermap.org/data/2.5/weather?q={$city},{$countryCode}&appid={$apiKey}";

        // Valido si selecciono fahrenheit o celsius para agregarle el parametro units
        if ($temperature == "Fahrenheit") {
            $url .= "&units=imperial";
        } else if ($temperature == "Celsius") {
            $url .= "&units=metric";
        }

        // Hago la solicitud al API
        $response = Http::get($url);

        if ($response->successful()) {
            $data = $response->json();
            $date = date('Y-m-d H:i:s', $data['dt']);

            $formattedTemperature = $data['main']['temp'] . " °" . $temperature[0];

            // Llamamos al procedimiento almacenado para guardar la ciudad en la tabla pronosticoEnc
            DB::statement('EXEC insertarPronosticoEnc ?', [$city]);

            // Obtenemos el id de la tabla pronosticoEnc
            $result = DB::select('EXEC TraerUltIDPronosticoEnc');
            $ultIDPronosticoEnc = $result[0]->idPronosticoEnc;

            // Llamamos al procedimiento almacenado para guardar los datos en la tabla pronosticoDet
            DB::statement('EXEC insertarPronosticoDet ?,?,?,?,?', [$ultIDPronosticoEnc, $date, $data['weather'][0]['description'], $formattedTemperature, $data['weather'][0]['icon']]);

            // Imprimir el resultado en la consola
            $this->info("El clima actual en {$data['name']} ({$data['sys']['country']}) es: {$data['weather'][0]['description']} con una temperatura de {$formattedTemperature}.");
        } else {
            $this->error('No se pudo obtener el clima de la ciudad especificada.');
        }
    }
}
