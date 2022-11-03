/** 
 * Modules Facade
 */
class ModulesFacade
{
    static modMaps() 
    {
        const ROOT = $app.modules.ROOT; 
        const _idx = { value: 0 };
        let indexMap = ModulesFacade.scanBase(ROOT, "", _idx);
        let idMaps = ModulesFacade.idMaps(indexMap  );

        return { indexMap, idMaps };
    }
    
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