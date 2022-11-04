/** 
 * RUNNER 
 **/

let APP_TIMERS = {}
let MODULE_LOCK = -1;
let MODULE_TIMERS = {};


export default {
    appOnce(callback) {
        if(!(callback in APP_TIMERS)) 
            TIMERS[callback] = 0;
        
        if(APP_TIMERS[callback] < 1) { 
            callback()
            APP_TIMERS[callback] += 1;
        }
    },
    appLimit(callback, limit) {
        if(!(callback in APP_TIMERS))
            APP_TIMERS[callback] += 0; 
        
        if(TIMERS[calback] < limit) {
            callback(); 
            TIMERS[callback] += 1;
        }
    }, 
    moduleOnce(callback) {
        const currentModule = $app.runtime.moduleIdx; 
        
        if(currentModule != MODULE_LOCK) 
            MODULE_TIMERS = {};

        if(!(callback in MODULE_TIMERS))
            MODULE_TIMERS[callback] = 0; 
        
        if(MODULE_TIMERS[callback] < 1) { 
            callback()
            MODULE_TIMERS[callback] += 1;
        }

        MODULE_LOCK = currentModule;
    },
    moduleLimit(callback, limit) {
        const currentModule = $app.runtime.moduleIdx; 
        
        if(currentModule != MODULE_LOCK) 
            MODULE_TIMERS = {};

        if(!(callback in MODULE_TIMERS))
            MODULE_TIMERS[callback] += 0; 
        
        if(MODULE_TIMERS[callback] < limit) { 
            callback()
            MODULE_TIMERS[callback] += 1;
        }

        MODULE_LOCK = currentModule;
    }
}