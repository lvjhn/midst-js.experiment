/** 
 * HELPERS REGISTRY 
 * A file of import to different helpers file.
 */
console.log("# Pre-load :: App. Loader --> Helpers Registry : Loading helpers")

const register = (name, Class) => {
    console.log(`# App. Loader -> Helpers Registry : Registering ${Class.name} -> $app.helpers.${name} `)
    $app.registry.registerHelper(name, Class)
}

import DeviceHelper from "@helpers://DeviceHelper"
register("Device", DeviceHelper)

import InstallerHelper from "@helpers://InstallerHelper"
register("Installer", InstallerHelper)

import LocationHelper from "@helpers://LocationHelper"
register("Location", LocationHelper)

export default {}