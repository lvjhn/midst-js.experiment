/** 
 * SETTINGS FILE
 * Settings Name: redirects  
 */

const settings = {}; 

/** 
 * REDIRECT TO MOBILE SITE
 * If set to true, redirects the user to the mobile site
 * when he is in a mobile device. 
 */
settings.redirectToMobileSite = 
    $app.parseBoolean(import.meta.env.APP_REDIRECT_TO_MOBILE_SITE); 

/**
 * REDIRECT TO WWW SITE 
 * If set to true, redirects the user to the www site 
 * when he is in a non-mobile device. 
 */
settings.redirectToWwwSite = 
    $app.parseBoolean(import.meta.env.APP_REDIRECT_TO_WWW_SITE); 

/** 
 * HANDLE WWW SUBDOMAIN 
 * Can be of two values: 
 *  (1) "add" : adds www. subdomain if it is not present 
 *  (2) "remove" : removes www. subdomain if it is not present 
 */
settings.handleWwwSubdomain = 
    import.meta.env.APP_HANDLE_WWW_SUBDOMAIN; 

// ----- globalize settings ----- //
$app.settings.redirects = settings;