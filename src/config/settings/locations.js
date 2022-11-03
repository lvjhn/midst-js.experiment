/** 
 * SETTINGS FILE
 * Settings Name: locations  
 */

const settings = {}; 

/**
 * VALID PRIMARY DOMAINS
 * The valid primary domains of the application. 
 * Used for other operations such as getting the subdomain.
 */
settings.validPrimaryDomains = [
    import.meta.env.APP_PRIMARY_DOMAIN,
    'localhost' 
];

// ----- globalize settings ----- //
$app.settings.locations = settings;