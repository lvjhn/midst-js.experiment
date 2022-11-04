import WWWCustomRoutes from './@sites/www/routes'
import WWWAutoRoutes from './@sites/www/routes/_auto'
import MobileCustomRoutes from './@sites/mobile/routes'
import MobileAutoRoutes from './@sites/mobile/routes/_auto'
import CommonCustomRoutes from './@sites/common/routes'
import CommonAutoRoutes from './@sites/common/routes/_auto'

import ModList from "./_modules"
import Main from "./main"

alert("Hello from account module 2");

export default {
    
    /** ===== MODULE INFO ===== */ 
    name: "account", 
    
    /** ===== ROUTING ===== */
    routing: {
        prefix      : "account",
        prePrefix   : "",
        root        : false 
    },

    /** ===== ROUTES ===== */
    routes: {
        www : {
            auto: WWWAutoRoutes, 
            custom: WWWCustomRoutes
        }, 
        mobile : {
            auto: MobileAutoRoutes, 
            custom: MobileCustomRoutes
        }, 
        common : {
            auto: CommonAutoRoutes, 
            custom: CommonCustomRoutes
        }
    },

    /** ===== MODULES ===== */
    modules: ModList,

    /** ===== MAIN FILE ===== */
    main: Main
}