/**
 * AXIOS SET-UP SCRIPT 
 * This script configures axios - #{LIBRARY_DESCRIPTION}#.
 */
import Axios from 'axios'
import createClients from '@start://utils/create-clients'

export default async () => {

    console.log("@ Lib. Setup : Setting up axios...");

    // ===== get application instance ====== // 
    const app = $app.instance; 

    // ===== create client context ===== //
    $app.clients = {
        ...$app.clients, 
        ...createClients(
            "rest", 
            (name, config) => Axios.create(config),
            $app.settings.clients.REST
        )
    }

}