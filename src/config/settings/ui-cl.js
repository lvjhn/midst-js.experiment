/** 
 * SETTINGS FILE
 * Settings Name: uicl  
 */

const settings = {}; 

/**
 * COMPONENT LIBRARIES
 */
settings.componentLibraries = {
    www: () => import("@libraries://ui-cl/element-plus.js"), 
    mobile: () => import("@libraries://ui-cl/framework7-vue.js")
}

// ----- globalize settings ----- //
$app.settings.uicl = settings;