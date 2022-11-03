/** MODULE CATALOG FILE **/ 

import RouteList1C from "^/src/temp/a"
import RouteList1W from "^/src/temp/b" 
import RouteList1M from "^/src/temp/c" 

const MODMAP = {
    0 : "app", 
    1 : "app.sign_up"
}

const _MODMAP = {
    "app" : 0, 
    "app.sign_up" : 1
}

const MODULES = {
    "app" : {
        "name"    : "app",
        "enabled" : false, 
        "routing" : {
            "root"          : true,
            "prefix"        : "", 
            "pre-prefix"    : "", 
        },
        "modules": {
        }, 
        "routes": {
            "common" : {
                "generated" : {}, 
                "custom"    : RouteList1C
            },
            "mobile": {
                "generated" : {}, 
                "custom"    : RoutesList1W
            },
            "www" : {
                "generated" : {}, 
                "custom"    : RoutesList1W
            }
        }
    } 
}

export default { 
    maps: { MODMAP, _MODMAP }, 
    root: app 
}