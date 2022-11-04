/** 
 * FACADES REGISTRATION
 */
$app.registry.registerFacade = (name, Class) => $app.facades[name] = Class; 

/**
 * HELPER REGISTRATION
 */
$app.registry.registerHelper = (name, Class) => $app.helpers[name] = Class; 

/**
 * LIBRARY REGISRATION
 */
(async function() {
    const libRegFns = [];
    $app.registry.registerLibrary = (name, regFn) => {
        libRegFns[name] = regFn;
    }
    $app.registry.registerLibraries = async () => {
        for(let libName in libRegFns) {
            const regFn = libRegFns[libName];
            await regFn(); 
        }
    }
})();