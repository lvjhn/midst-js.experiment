/** 
 * MODULES FACADE
 * Facade functons for module context.
 */
class ModulesFacade
{   
    /** 
     * Get the module mappings (indexMap and idMaps)
     */
    static modMaps() 
    {
        const ROOT = $app.modules.ROOT; 
        const _idx = { value: 0 };
        let indexMap = ModulesFacade.scanBase(ROOT, "", _idx);
        let idMaps = ModulesFacade.idMaps(indexMap  );

        return { indexMap, idMaps };
    }
    
    /** 
     * Scans a base module index for indexes
     */
    static scanBase(base, prefix, _idx) 
    {   
        let map = {};

        base.idx = _idx.value;
        _idx.value += 1;

        let prefixer = prefix;
        if(prefix != "")
            prefixer = prefixer + ".";

        const regName = prefixer + base.name;
        map[regName] = base; 

        for(let submoduleName in base.modules) {
            const submodule = base.modules[submoduleName];
            map = {
                ...map, 
                ...ModulesFacade.scanBase(submodule, regName, _idx)
            }
        }

        return map;
    }

    /**
     * Creates ID maps for an index map.
     */
    static idMaps(indexMap) 
    {
        const forward  = {};
        const backward = {};
        
        for(let id in indexMap) {
            const index = indexMap[id]; 
            forward[id]   = index.idx; 
            backward[index.idx] = id; 
        }

        return { forward, backward }
    }
}

export default ModulesFacade;