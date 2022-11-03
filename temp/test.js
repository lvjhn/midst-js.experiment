import Modules from "../.midst/utils/modules/Modules.js";

console.log(await Modules.path("app"));
console.log(await Modules.path("app.installer"));
console.log(await Modules.path("app.auth.sign_up"));
console.log("---")
console.log(await Modules.parent("app"));
console.log(await Modules.parent("app.installer"));
console.log(await Modules.parent("app.auth.sign_up"));
console.log(await Modules.parent(Modules.id("src/app/@modules/auth/@modules/sign_up/test.js")));

console.log("---")
console.log(await Modules.id(await Modules.path("app")));
console.log(await Modules.id(await Modules.path("app.installer")));
console.log(await Modules.id(await Modules.path("app.auth.sign_up")));
console.log(await Modules.id("src/app/@modules/auth/@modules/sign_up/test.js"));
