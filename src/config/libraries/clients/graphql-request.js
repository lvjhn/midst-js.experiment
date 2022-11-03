/**
 * GRAPHQL-REQUEST SET-UP SCRIPT 
 * This script configures graphql-request - #{LIBRARY_DESCRIPTION}#.
 */
import { GraphQLClient } from 'graphql-request'
import createClients from '@start://utils/create-clients'

export default async () => {

    console.log("@ Lib. Setup : Setting up graphql-request...");

    // ===== get application instance ====== // 
    const app = $app.instance; 
    
    // ===== create client context ===== //
    $app.clients = {
        ...$app.clients, 
        ...createClients(
            "gql", 
            (name, config) => new GraphQLClient(config.endpoint, config.options),
            $app.settings.clients.GQL
        )
    }
}