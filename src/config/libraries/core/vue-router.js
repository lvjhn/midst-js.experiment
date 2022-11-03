
/**
 * VUE-ROUTER SET-UP SCRIPT 
 * This script configures vue-router - #{LIBRARY_DESCRIPTION}#.
 */
import { createRouter, createWebHistory } from "vue-router";

export default async () => {

    console.log("@ Lib. Setup : Setting up vue-router...");

    // ===== get application instance ====== // 
    const app = $app.instance; 

    // ===== create router instance ===== //
    const router = createRouter({
        history: createWebHistory(), 
        routes: $app.routes.ROUTE_LIST 
    });  

    // ===== globalize router instance ===== // 
    $app.libraries.router = router; 

    // ===== install router to app instance ===== // 
    app.use(router);
}