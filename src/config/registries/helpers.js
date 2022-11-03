/** 
 * HELPERS REGISTRY 
 * A file of import to different helpers file.
 */
console.log("# Pre-load :: App. Loader --> Helpers Registry : Loading helpers")

import DeviceHelper from "@helpers://DeviceHelper"
$app.helpers.DeviceHelper = DeviceHelper; 

import InstallerHelper from "@helpers://InstallerHelper"
$app.helpers.InstallerHelper = InstallerHelper; 

import LocationHelper from "@helpers://LocationHelper"
$app.helpers.LocationHelper = LocationHelper; 

import ModulesHelper from "@helpers://ModulesHelper"
$app.helpers.ModulesHelper = ModulesHelper; 

import PWAHelper from "@helpers://PWAHelper"
$app.helpers.PWAHelper = PWAHelper; 

import RoutesHelper from "@helpers://RoutesHelper"
$app.helpers.RoutesHelper = RoutesHelper;

export default {}