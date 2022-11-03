/** 
 * FACADES REGISTRY 
 * A file of import to different facades file.
 */
console.log("# Pre-load :: App. Loader --> Facades Registry : Loading facades")

import ModulesFacade from "@facades://ModulesFacade"
$app.facades.ModulesFacade = ModulesFacade; 

import RoutesFacade from "@facades://RoutesFacade"
$app.facades.RoutesFacade = RoutesFacade; 

export default {}