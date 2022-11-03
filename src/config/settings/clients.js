/** 
 * SETTINGS FILE
 * Settings Name: clients  
 */

const settings = {};

/** ----- define client configuration ----- */

/** 
 * REST CLIENTS CONFIGURATION
 */
settings.REST = {
    default: 'main-backend', 
    clients: {
        'main-backend' : {
            baseURL: import.meta.env.APP_MAIN_BACKEND_REST,
            withCredentials: true
        }
    }
}

/** 
 * GRAPHQL CLIENTS CONFIGURATION
 */
settings.GQL = {
    default: 'main-backend', 
    clients: {
        'main-backend' : {
            endpoint: import.meta.env.APP_MAIN_BACKEND_GQL,
            options: {
                credentials: 'include', 
                mode: 'cors'
            }
        }
    }
}

/** 
 * LARAVEL-ECHO CLIENTS CONFIGURATION
 */
settings.Echo = {
    default: 'main-backend', 
    clients: {
        'main-backend': {
            broadcaster: 'pusher', 
            key: import.meta.env.APP_MAIN_BACKEND_ECHO_KEY, 
            host: import.meta.env.APP_MAIN_BACKEND_ECHO_HOST, 
            port: import.meta.env.APP_MAIN_BACKEND_ECHO_PORT, 
            tls: $app.parseBoolean(import.meta.env.APP_MAIN_BACKEND_ECHO_TLS), 
            disableStats: !$app.parseBoolean(import.meta.env.APP_MAIN_BACKEND_ECHO_STATS)
        }
    }
}

// ----- globalize settings ----- //
$app.settings.clients = settings;