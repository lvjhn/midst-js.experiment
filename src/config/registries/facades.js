/** 
 * FACADES REGISTRY 
 * A file of import to different facades file.
 */
console.log("# Pre-load :: App. Loader --> Facades Registry : Loading facades")

const register = (name, Class) => {
    console.log(`# App. Loader -> Facades Registry : Registering ${Class.name} -> $app.facades.${name} `)
    $app.registry.registerFacade(name, Class)
}

import ModulesFacade from "@facades://ModulesFacade"
register("Modules", ModulesFacade); 

import RoutesFacade from "@facades://RoutesFacade"
register("Routes", RoutesFacade)

import RuntimeFacade from "@facades://RuntimeFacade"
register("Runtime", RuntimeFacade)

export default {}