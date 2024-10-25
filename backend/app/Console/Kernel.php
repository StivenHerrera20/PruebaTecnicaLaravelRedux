<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define los comandos que se ejecutarán.
     *
     * @var array
     */
    protected $commands = [
        \App\Console\Commands\forecast::class,
    ];

    /**
     * Define el cronograma de comandos.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Aquí puedes agendar comandos si es necesario
    }

    /**
     * Registra los comandos de la aplicación.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
