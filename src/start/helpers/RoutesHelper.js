/** 
 * ROUTES HELPER 
 */
import ModulesHelper from "@helpers://ModulesHelper"

class RoutesHelper 
{
    /** 
     * Gets the route prefix of each module
     */
    static async modulePrefixes() 
    {       
        const modtree = 
            await ModulesHelper.tree();

        const synthRootIndex = { 
            index: {
                name: "app",
                routing: {
                    prePrefix: null, 
                    prefix: "", 
                    root: true
                }
            },
            modules: modtree 
        }

        let prefixMapping = 
            await RoutesHelper.scanPrefixes(synthRootIndex, "", "");


        return prefixMapping;
    }

    static async scanPrefixes(node, routePrefix, moduleIdPrefix) 
    {
        let prefixMapping = {};

        const index = node.index; 
        const modules = node.modules; 

        const origRoutePrefix = routePrefix; 
        const origModuleIdPrefix = moduleIdPrefix; 

        if(index.routing.prePrefix != null && index.routing.prePrefix != "")
            routePrefix += "/" + index.routing.prePrefix  
        if(index.routing.prefix != null && index.routing.prefix != "")
            routePrefix += "/" + index.routing.prefix 
        
        const moduleId = 
            (moduleIdPrefix != "" ? moduleIdPrefix + "." : "") + index.name;  

        if(index.routing.root)
            routePrefix = "/" + index.name;
        if(moduleId == "app") 
            routePrefix = "";
        
        prefixMapping[$app._modmap[moduleId]] = routePrefix

        for(let submodule in modules) {
            prefixMapping = {
                ...prefixMapping, 
                ...await this.scanPrefixes(modules[submodule], routePrefix, moduleId)
            }
        }

        return prefixMapping;
    }

    /** 
     * Get the routes of each module
     */
    static async moduleRoutes() 
    {
        const modlist = await ModulesHelper.list(); 
        const routes = {}; 

        for(let modId in modlist) {
            routes[modId] = {};
            routes[$app._modmap[modId]] = {}; 
            const modIndex = modlist[modId]; 
            const sites = modIndex.sites; 

            for(let site in sites) {
                routes[$app._modmap[modId]][site] = sites[site].routes;
            }
        }

        return routes;
    }

    /** 
     * Combine routes into one list
     */
    static async combineRoutes()
    {
        let routes = [];
        const modRoutes = $app.routes.moduleRoutes;
        const modPrefixes = $app.routes.modulePrefixes;

        const routingMode = $app.settings.routing.mode; 
        const mobilePrefix = $app.settings.routing.mobilePrefixes.subdirectory;

        for(let modId in modRoutes) {
            const modPrefix = modPrefixes[modId]; 
            const sitesRoutes = modRoutes[modId]; 

            for(let site in sitesRoutes) {
                const siteRoutes = sitesRoutes[site]; 
                
                for(let routeGroupName in siteRoutes) {
                    const routeGroup = siteRoutes[routeGroupName]; 
                    let prefixedRoutes = 
                        routeGroup.map((x) => ({ ...x, path: modPrefix + x.path })); 
                    
                    if(routingMode == "subdirectory" && site == "mobile") {
                        prefixedRoutes = 
                            prefixedRoutes.map((x) => ({ ...x, path: "/" + mobilePrefix + x.path }) );
                    }

                    const finalRoutes = 
                        prefixedRoutes.map((x) => ({ 
                            ...x, 
                            meta: {
                                $site: site, 
                                $modId: modId, 
                                $isGenerated: (routeGroupName == "generatedRoutes") 
                            }
                        }));

                    routes = [ ...routes, ...finalRoutes ]
                }
            }
        }

        return routes;
    }
}   

export default RoutesHelper;