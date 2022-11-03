/**
 * APPLICATION LOADER
 * Loads the application as prepared by midst
 */

class AppLoader 
{   
    constructor() 
    {
        $app.modules = {};
    }

    /** 
     * Defines the general steps to load the app.
     */
    async initApp() 
    {
        await this.loadModuleRoot(); 
    }

    /** 
     * Load Module Root
     */
    async loadModuleRoot() 
    {
        console.log("# AppLoader : Loading module root...");
        $app.modules.ROOT = (await import("@/app/index.js")).default; 
        console.log("# AppLoader : Finished loading module root..."); 
    }

}

export default AppLoader;