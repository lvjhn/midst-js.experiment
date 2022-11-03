/**
 * LARAVEL-ECHO SET-UP SCRIPT 
 * This script configures laravel-echo - #{LIBRARY_DESCRIPTION}#.
 */
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

import createClients from '@start://utils/create-clients'

window.Pusher = Pusher;

export default async () => {

    console.log("@ Lib. Setup : Setting up laravel-echo...");

    // ===== get application instance ====== // 
    const app = $app.instance; 

    // ===== create client context ===== //
    $app.clients = {
        ...$app.clients, 
        ...createClients(
            "echo", 
            (name, config) => new Echo(config),
            $app.settings.clients.GQL
        )
    }
}