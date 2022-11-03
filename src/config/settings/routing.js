/** 
 * SETTINGS FILE
 * Settings Name: routing  
 */

const settings = {}; 

/** 
 * ROUTING MODE 
 * Configures the routing mode of the router. 
 * Can be of two values: 
 *    (1) "subdomain" - uses subdomain for mobile routing 
 *            e.g. m.example.com
 *    (2) "subdirectory" - uses subdirectory for mobile routing
 *            e.g. example.com/mobile/ 
 */
settings.mode = 
    import.meta.env.APP_ROUTING_MODE; 

/** 
* MOBILE SITE PREFIXES
* Configures the prefixes of the mobile site. 
*/
settings.mobilePrefixes = {
    // without the period
    subdomain: 
        import.meta.env.APP_ROUTING_MOBILE_SUBDOMAIN,           
    // without slashes 
    subdirectory: 
        import.meta.env.APP_ROUTING_MOBILE_SUBDIRECTORY    
}

// ----- globalize settings ----- //
$app.settings.routing = settings;
