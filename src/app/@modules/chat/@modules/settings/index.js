import WWWCustomRoutes from './@sites/www/routes'
import WWWAutoRoutes from './@sites/www/routes/_auto'
import MobileCustomRoutes from './@sites/mobile/routes'
import MobileAutoRoutes from './@sites/mobile/routes/_auto'
import CommonCustomRoutes from './@sites/common/routes'
import CommonAutoRoutes from './@sites/common/routes/_auto'

import ModList from "./_modules"

export default {
    
    /** ===== MODULE INFO ===== */ 
    name: "settings", 
    
    /** ===== ROUTING ===== */
    routing: {
        prefix      : "settings",
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
    modules: ModList
}