<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

//Ruta Clima Actual
Route::get('/weather/current', [WeatherController::class, 'getWeatherCurrent']);

//Ruta previsión
Route::get('/weather/forecast', [WeatherController::class, 'getWeatherForecast']);
