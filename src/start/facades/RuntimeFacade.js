/**
 * RUNTIME FACADE 
 * Facade functions for runtime context.
 */
$app.runtime.onRegisterHooks = [];

class RuntimeFacade     
{   
    /** 
     * Gets the current modle chain of the current view. 
     */
    static moduleChain() 
    {
        const moduleIdx = $app.runtime.moduleIdx; 
        const moduleId = $app.modules.ID_MAP[moduleIdx];
        const chain = moduleId.split(".");
        return chain;
    }

    /** 
     * Gets the chains of the module chain for the current view.
     */
    static async modMainChain() 
    {
        const modIdx = $app.runtime.moduleIdx; 
        const moduleId = $app.modules.ID_MAP[modIdx]; 

        const tokens = moduleId.split("."); 
        const chain = [] 
        let buffer = "";

        for(let token of tokens) {
            buffer += token; 
            const mainFn = (await $app.modules.MAIN_MAP[buffer]()).default;
            chain.push(mainFn);
            buffer += "."
        }

        return chain;
    }

    /** 
     * Run module main files of the module chain.
     */
    static async runModMains () {
        const chain = await RuntimeFacade.modMainChain(); 
        for(let mainFn of chain) {
            await mainFn();
        }
    }

    /** 
     * Run site's main file.
     */
    static async runSiteMain() {
        await $app.runtime.main();
    }

    /**  
     * Common runtime registration function for a current route
     */
    static async commonRegistration () {
        
        const route = $app.libraries.router.currentRoute._value;
        
        $app.runtime.route = route;
        $app.runtime.moduleIdx = route.meta.$module;

        await RuntimeFacade.callOnRegisterHooks();
    }

    /** 
     * Registers a hook to call after a route's runtime is registered.
     */
    static async onRegister (callback)  {
        $app.runtime.onRegisterHooks.push(callback)
    }

    /** 
     * Calls the registration hooks.
     */
    static async callOnRegisterHooks () {
        for(let registrationHook of $app.runtime.onRegisterHooks) {
            await registrationHook();
        } 
    }

    /** 
     * Gets the subroot chain (vue files to wrap the view wrapper).
     */
    static subrootChain () {
    
    }
}

export default RuntimeFacade;