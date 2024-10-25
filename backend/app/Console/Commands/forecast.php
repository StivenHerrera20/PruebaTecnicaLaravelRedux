<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class forecast extends Command
{
    protected $signature = 'forecast {city} {countryCode} {--d|days=1} {--t|temperature=Kelvin}';
    protected $description = 'Obtener el pronóstico del clima de una ciudad para los próximos días';

    public function handle()
    {
        // Obtiene los argumentos y opciones del comando
        $city = $this->argument('city');
        $countryCode = $this->argument('countryCode');
        $days = $this->option('days'); // cantidad de días
        $temperature = $this->option('temperature');

        // Trae la API Key desde el archivo .env
        $apiKey = env('OPENWEATHER_API_KEY');

        // Calcula la cantidad de registros para el pronóstico (8 registros por día)
        $quantityDays = $days * 8;

        // Construye la URL con los parámetros
        $url = "https://api.openweathermap.org/data/2.5/forecast?q={$city},{$countryCode}&appid={$apiKey}&cnt={$quantityDays}";

        // Agrega el parámetro de temperatura si se especifica
        if ($temperature == "Fahrenheit") {
            $url .= "&units=imperial";
        } elseif ($temperature == "Celsius") {
            $url .= "&units=metric";
        }

        // Realiza la solicitud a la API de OpenWeather
        $response = Http::get($url);

        if ($response->successful()) {
            $data = $response->json();
            $forecast = [];

            if ($quantityDays >= 8 && $quantityDays <= 40) {
                DB::statement('EXEC insertarPronosticoEnc ?', [$city]);
                $result = DB::select('EXEC TraerUltIDPronosticoEnc');
                $ultIDPronosticoEnc = $result[0]->idPronosticoEnc;

                // Recorre cada registro de pronóstico y guarda los datos
                for ($i = 0; $i < $quantityDays; $i++) {
                    $date = date('Y-m-d H:i:s', $data['list'][$i]['dt']);
                    $weatherDescription = $data['list'][$i]['weather'][0]['description'];
                    $formattedTemperature = $data['list'][$i]['main']['temp'] . " °" . $temperature[0];

                    // Guarda el pronóstico en la base de datos
                    DB::statement('EXEC insertarPronosticoDet ?,?,?,?,?', [
                        $ultIDPronosticoEnc,
                        $date,
                        $weatherDescription,
                        $formattedTemperature,
                        $data['list'][$i]['weather'][0]['icon'],
                    ]);

                    // Agrega el pronóstico al array de resultados
                    $forecast[] = [
                        'date' => $date,
                        'weather' => $weatherDescription,
                        'temperature' => $formattedTemperature,
                    ];
                }

                // Muestra el pronóstico en la consola
                $this->info("Pronóstico del clima para {$city} ({$countryCode})");
                foreach ($forecast as $dayForecast) {
                    $this->info("Fecha: {$dayForecast['date']}, Clima: {$dayForecast['weather']}, Temperatura: {$dayForecast['temperature']}");
                }
            } else {
                $this->error('Cantidad de días no válida o excede el rango de los datos.');
            }
        } else {
            $this->error('No se pudo obtener el clima de la ciudad especificada.');
        }
    }
}
