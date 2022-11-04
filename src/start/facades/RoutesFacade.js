/** 
 * ROUTES FACADE
 * Facade functions for route context;
 */
import _ from 'lodash'

class Routes
{
    /** 
     * Gets the route prefix map of all modules.
     */
    static routePrefixes() 
    {
        const ROOT = $app.modules.ROOT;
        let prefixMap = Routes.scanBaseForPrefix(ROOT, "");
        return prefixMap;
    }

    /**
     * Scans a specified index for prefixes.
     */
    static scanBaseForPrefix(base, prefix_) 
    {
        let prefixMap = {};
    
        const origPrefix = prefix_;
        
        const routing = base.routing; 
        const { root, prePrefix,  prefix } = routing; 

        let _prefix = prefix_; 

        if(root)
            _prefix = "/";

        if(prePrefix != "" && prePrefix != null)
            _prefix += prePrefix + "/";
        
        if(prefix != "" && prefix != null)
            _prefix += prefix 

        _prefix = _prefix.replaceAll(/\/+/g, "/");

        prefixMap[base.idx] = _prefix

    
       for(let submoduleName in base.modules) {
            const submodule = base.modules[submoduleName];
            prefixMap = {
                ...prefixMap, 
                ...Routes.scanBaseForPrefix(submodule, _prefix + "/")
            }
        }
 
        return prefixMap;
    }

    /** 
     * Gets the route list of all modules.
     */
    static routeList() 
    {
        const INDEX_MAP = $app.modules.INDEX_MAP;
        const ROUTE_PREFIX_MAP = $app.routes.ROUTE_PREFIX_MAP;
        let routeList = []; 

        const routingMode = $app.settings.routing.mode; 
        const mobilePrefix = $app.settings.routing.mobilePrefixes.subdirectory;

        for(let moduleId in INDEX_MAP) {
            const base = INDEX_MAP[moduleId]; 
            const modulePrefix = ROUTE_PREFIX_MAP[base.idx];
            const routes = base.routes; 

            for(let site in routes) {
                const siteRoutes = routes[site]; 
                
                for(let mode in siteRoutes) {
                    const routes = _.cloneDeep(siteRoutes[mode]); 

                    for(let route of routes) {
                        let _prefix = modulePrefix;
                        if(!route.meta?.$root) {

                            if(routingMode == "subdirectory" && site == "mobile") {
                                _prefix = "/" + mobilePrefix + _prefix; 
                            }  

                            route.path = _prefix + route.path  
                            
                            if(!route.meta) 
                                route.meta = {}

                            route.meta.$site = site;
                            route.meta.$mode = mode;
                            route.meta.$module = base.idx;

                            route.path = route.path.replaceAll(/\/+/g, "/")
                        }
                    }

                    routeList = [...routeList, ...routes];
                }
            }
        }

        return routeList;
    }
}
export default Routes;