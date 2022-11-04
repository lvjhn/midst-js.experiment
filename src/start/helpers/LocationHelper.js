/** 
 * LOCATION HELPER
 * Contains function for getting basic information about URI.
 * For more advanced url manipulation, use URI.js as is. 
 */
import URI from 'urijs'

class LocationHelper 
{
    constructor({ url = null, validPrimaryDomains = null } = {}) 
    {
        this.location = 
            url ?? location.href; 

        this.validPrimaryDomains = 
            validPrimaryDomains ?? $app.settings.locations.validPrimaryDomains; 
    }
    
    /**
     * Get URI of location
     */
    uri() 
    {
        return URI(this.location);
    }

    /**
     * Get the primary domain of a location
     */
    primaryDomain() 
    {
        const uri = this.uri(); 
        const hostname = uri.hostname(); 
        const validPrimaryDomains = this.validPrimaryDomains;

        for(let validPrimaryDomain of validPrimaryDomains) {
            const tail = hostname.substring(hostname.length - validPrimaryDomain.length);
            if(validPrimaryDomain == tail)
                return validPrimaryDomain; 
        }

        return null; 
    }

    /**
     * Get the subdomain of a location
     */
    subdomain() 
    {
        const uri = this.uri(); 
        const hostname = uri.hostname(); 
        const primaryDomain = this.primaryDomain(); 
        const endOfSubdomain = hostname.length - primaryDomain.length - 1;
        const subdomain = hostname.substring(0, endOfSubdomain);
        return subdomain; 
    }

    /**
     * Get subdomains of a location
     */
    subdomains() 
    {
        return this.subdomain().split("."); 
    }   

    /**
     * Get subdirectories of a location
     */
    subdirectories() 
    {
        return this.uri().pathname().split("/");
    }   

    /**
     * Checks if a location is designed for mobile site
     */
    isMobileSite() 
    {
        if($app.settings.routing.mode == "subdomain") {
            const firstSubdomain = this.subdomains()[0];
            const subdomainPrefix = 
                $app.settings.routing.mobilePrefixes.subdomain;
            if(firstSubdomain == subdomainPrefix) 
                return true; 
        }
        else if($app.settings.routing.mode == "subdirectory") {
            const firstSubdirectory = this.subdirectories()[1]; 
            const subdirectoryPrefix = 
                $app.settings.routing.mobilePrefixes.subdirectory
            if(firstSubdirectory == subdirectoryPrefix) 
                return true;
        }   
        return false;    
    }

    /**
     * Checks if a location is designed for www site
     */
    isWwwSite() 
    {
        return !this.isMobileSite(); 
    }

    /**
     * Checks if location has www subdomain
     */
    withWwwSubdomain() 
    {
        const uri = this.uri(); 
        const hostname = uri.hostname(); 
        const startsWithWww = 
            hostname.substring(0, "www".length) == "www"
        return startsWithWww;
    }

    /**
     * Checks if location has no www subdomain
     */
    withoutWwwSubdomain() 
    {
        return !this.withWwwSubdomain(); 
    }

    /**
     * Removes www from location
     */
    removeWwwSubdomain() 
    {
        const uri = this.uri();

        // return same URL if it has no www already
        if(this.withoutWwwSubdomain()) 
            return uri.toString(); 
        
        // remove www. from hostname 
        const hostname = uri.hostname(); 
        const newHostname = hostname.substring("www.".length); 
        const newURI = uri.hostname(newHostname); 

        return newURI.toString(); 
    }   

    /**
     * Adds www to location
     */
    addWwwSubdomain() 
    {
        const uri = this.uri();

        // return same URL if it has www already 
        if(this.withWwwSubdomain()) 
            return uri.toString(); 

        // remove www. from hostname 
        const hostname = uri.hostname(); 
        const newHostname = "www." + hostname; 
        const newURI = uri.hostname(newHostname); 

        return newURI.toString();
    }

    /**
     * Gets the mobile site version of a location
     */
    mobileSiteLocation() 
    {
        const uri = this.uri();

        if(this.isMobileSite()) 
            return uri.toString(); 
        
        // if routing mode is subdomain 
        if($app.settings.routing.mode == "subdomain") {
            const subdomainPrefix =         
                $app.settings.routing.mobilePrefixes.subdomain; 
            const hostname =
                uri.hostname(); 
            let newURI;

            if(this.withWwwSubdomain()) {
                newURI = uri.hostname(hostname.substring("www.".length))
                newURI = newURI.hostname(subdomainPrefix + "." + newURI.hostname())
            } 
            else { 
                newURI = uri.hostname(subdomainPrefix + "." + hostname)
            }

            return newURI.toString();
        }   
        // if routing mode is subdirectory
        else if($app.settings.routing.mode == "subdirectory") {
            const subdirectoryPrefix = 
                $app.settings.routing.mobilePrefixes.subdirectory; 
            const pathname = 
                uri.pathname(); 
            let newURI;

            if(this.withWwwSubdomain()) {
                newURI = uri.hostname(hostname.substring("www.".length))
                newURI = newURI.pathname("/" + subdirectoryPrefix + pathname)
            } 
            else { 
                newURI = uri.pathname("/" + subdirectoryPrefix + pathname)
            }

            return newURI.toString(); 
        }

        return null; 
    }

    /**
     * Gets the www site version of a location
     */
    wwwSiteLocation() 
    {
        const uri = this.uri(); 

        if(this.isWwwSite()) 
            return uri.toString(); 

        // if routing mode is subdomain 
        if($app.settings.routing.mode == "subdomain") {
            const subdomainPrefix =         
                $app.settings.routing.mobilePrefixes.subdomain; 
            const hostname =
                uri.hostname(); 
            let newURI = 
                uri.hostname(hostname.substring(subdomainPrefix.length + 1))     
            
            const newURIHelper = 
                new LocationHelper({ url: newURI.toString() });

            if(newURIHelper.shouldAddWwwSubdomain()) {
                newURI = URI(newURIHelper.addWwwSubdomain());
            }

            return newURI.toString();
        }   
        // if routing mode is subdirectory
        else if($app.settings.routing.mode == "subdirectory") {
            const subdirectoryPrefix = 
                $app.settings.routing.mobilePrefixes.subdirectory; 
            const pathname = 
                uri.pathname(); 
            let newURI = 
                uri.pathname(pathname.substring(subdirectoryPrefix.length + 1)); 

            const newURIHelper = 
                new LocationHelper({ url: newURI.toString() });

            if(newURIHelper.shouldAddWwwSubdomain()) {
                newURI = URI(newURIHelper.addWwwSubdomain());
            }

            return newURI.toString(); 
        }

        return null; 
    }

    /**
     * Checks if location should redirect to mobile site
     */
    shouldRedirectToMobileSite() 
    {
        return (
            $app.settings.redirects.redirectToMobileSite && 
            $app.helpers.Device.isMobileDevice() && 
            !this.isMobileSite() 
        );
    }

    /**
     * Checks if location should redirect to www site
     */
    shouldRedirectToWwwSite() 
    {
        return (
            $app.settings.redirects.redirectToWwwSite && 
            !$app.helpers.Device.isMobileDevice() && 
            !this.isWwwSite()    
        );
    }

    /**
     * Checks if www subdomain should be removed from location
     */
    shouldRemoveWwwSubdomain() 
    {
        return ( 
            ($app.settings.redirects.handleWwwSubdomain == "remove") && 
            this.withWwwSubdomain() && 
            this.isWwwSite()
        )
    }

    /**
     * Checks if www subdomain should be added to location
     */
    shouldAddWwwSubdomain() 
    {
        return (
            ($app.settings.redirects.handleWwwSubdomain == "add") && 
            this.withoutWwwSubdomain() && 
            this.isWwwSite()
        )
    }

    /**
     * Gets the site name of a location (www | mobile)
     */
    siteName() {
        if(this.isWwwSite())
            return "www"
        else if(this.isMobileSite())
            return "mobile"
        else 
            return null;
    }

    /**
     * Prefixes routes with a specified prefix
     */
    static prefixRoutes(prefix, routes) {
        for(let route of routes) {
            route.path = "/" + prefix + route.path;
        }
        return routes;
    }

    /**
     * Creates an instance of a location helper for the current location in the browser.
     */
    static instance() 
    {
        return new LocationHelper();
    }
}

export default LocationHelper; 