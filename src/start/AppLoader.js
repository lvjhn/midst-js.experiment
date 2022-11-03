/**
 * APPLICATION LOADER
 * Loads the application as prepared by midst
 */
import "&midst://scripts/global-add-ons"

/** Load Settings */
import "@registries://settings"

/** Load Helpers */
import "@registries://helpers"
import { createApp } from "vue"

/** Load Application Root */
import App from "@/App.vue"

class AppLoader 
{   
    constructor() 
    {
        $app.modules = {};
        $app.instance = null; 
        $app.clients = {};
    }

    /** 
     * Defines the general steps to load the app.
     */
    async initApp() 
    {
        await this.loadModuleRoot(); 
        await this.createInstance(); 
        await this.loadLibraries();
        await this.mountInstance(); 
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
    }

    /**
     * Load Libraries
     */
    async loadLibraries() 
    {
        console.log("# App. Loader: Loading libraries...");
        await import("@registries://libraries")
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