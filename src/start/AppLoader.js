/**
 * APPLICATION LOADER
 * Loads the application as prepared by midst
 */
import Axios from 'axios'

/** Load Global & App Add Ons */
import "&midst://scripts/global-add-ons"
import "@start://runtime/app-add-ons"

/** Load Settings */
import "@registries://settings"

/** Load Helpers */
import "@registries://helpers"

/** Load Facades */
import "@registries://facades"

/** Load Application Root */
import { createApp } from "vue"
import App from "@/App.vue"

class AppLoader 
{   
    constructor() 
    {
        $app.modules = {};
        $app.routes = {};
        $app.instance = null; 
        $app.clients = {};
        $app.libraries = {};
    }

    /** 
     * Defines the general steps to load the app.
     */
    async initApp() 
    {
        await this.applyRedirects();
        await this.loadModuleRoot(); 
        await this.loadRouteList();
        await this.loadMainMap();
        await this.loadManifestData(); 
        await this.createInstance(); 
        await this.loadLibraries();
        await this.setTitle();
        await this.mountInstance(); 
    }

    /** 
     * Load Main Map
     */
    async loadMainMap() 
    {
        console.log("# App. Loader: Loading main map..."); 
        $app.modules.MAIN_MAP = 
            (await import("@start://runtime/main.map")).default;
    }

    /** 
     * Apply Redirects
     */
    async applyRedirects() 
    {
        console.log("# App. Loader: Applying redirects...");
        const $locHelper = $app.helpers.Location.instance();
        
        if($locHelper.shouldRedirectToMobileSite()) {
            window.location = $locHelper.mobileSiteLocation();
        }

        if($locHelper.shouldRedirectToWwwSite()) {
            window.location = $locHelper.wwwSiteLocation();
        }

        if($locHelper.shouldAddWwwSubdomain()) {
            window.location = $locHelper.addWwwSubdomain(); 
        }

        if($locHelper.shouldRemoveWwwSubdomain()) {
            window.location = $locHelper.removeWwwSubdomain(); 
        }
    }

    /** 
     * Load Manifest Data
     */ 
    async loadManifestData() 
    {
        console.log("@ Loading manifest data")
        $app.manifest = (await Axios.get("/manifest.json")).data
    }   
    
    /** 
     * Create Vue instance
     */
    async createInstance() 
    {
        console.log("@ App. Loader: Creating app instance using Vue.createApp");
        $app.instance = createApp(App);
    }

    /** 
     * Load Module Root
     */
    async loadModuleRoot() 
    {
        console.log("# App. Loader: Loading module root...");
        $app.modules.ROOT = (await import("@/app/index.js")).default; 
        const modMaps = $app.facades.Modules.modMaps(); 
        $app.modules.INDEX_MAP = modMaps.indexMap; 
        $app.modules.IDX_MAP = modMaps.idMaps.forward;
        $app.modules.ID_MAP = modMaps.idMaps.backward;
    }

    /** 
     * Load Route List
     */
    async loadRouteList() 
    {
        console.log("# App. Loader: Loading route list...");
        $app.routes.ROUTE_PREFIX_MAP = $app.facades.Routes.routePrefixes(); 
        $app.routes.ROUTE_LIST = $app.facades.Routes.routeList(); 
    }
     
    /**
     * Load Libraries
     */
    async loadLibraries() 
    {
        console.log("# App. Loader: Loading libraries...");
        const loadLibraries = (await import("@registries://libraries")).default;
        await loadLibraries();
    } 

    /**
     * Set Initial Title
     */
    async setTitle() 
    {
        console.log("@ Setting title of document");
        document.title = $app.manifest.name;
    }

    /**
     * Mount instance
     */
    async mountInstance() 
    {
        console.log("# App. Loader: Mounting instance to '#app'")
        $app.instance.mount("#app");
    }

}

export default AppLoader;