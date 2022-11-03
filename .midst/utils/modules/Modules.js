/**
 * MODULES UTILITY CLASS
 */
import fs from 'fs'

class Modules
{
    /** 
     * Get the path of a module given its id.
     */
    static path(moduleId) 
    {
        let path = "src/app";

        if(moduleId == "app")
            return path;

        const tokens = moduleId.split(".").slice(1);
        for(let token of tokens) {
            path += "/@modules/" + token; 
        }

        return path; 
    }

    /**
     * Get the id of a module given its path.
     */
    static id(path, rootDir, hasRootPath = false) 
    {
        if(hasRootPath) 
            path = path.split(rootDir + "/src/app").join(""); 
        else 
            path = path.split("src/app").join("");

        let moduleId = "app";

        const tokens = path.split("/"); 
        const chain = [];


        let i = 0;
        while(i < tokens.length) {
            if(tokens[i] == "@modules") {
                chain.push(tokens[i + 1]);
                i += 2;
                continue;
            }
            i++;
        }

        moduleId += "." + chain.join(".");

        if(moduleId.at(-1) == ".")
            moduleId = moduleId.substring(0, moduleId.length - 1);

        return moduleId;
    }

    /**
     * Transform a module id into an array.
     */
    static chain(moduleId)
    {
        return moduleId.split(".")
    }

    /**
     * Get the id of the parent module of a module id.
     */
    static parent(moduleId, level=1) 
    {
        const chain = Modules.chain(moduleId); 
        if(level > chain.length) 
            throw Error("Out of bounds for parent in chain.")
        return chain.slice(0, chain.length - 1).join(".");
    } 

    /** 
     * Get the submodules of a module given a module id.
     */
    static submodules(moduleId) 
    {
        const modPath = Modules.path(moduleId); 
        const submodules = fs.readdirSync(modPath + "/@modules");
        return submodules; 
    }

    /**
     * Get the name of a module given a module id.
     */
    static name(moduleId) 
    {   
        return Modules.chain(moduleId).at(-1);
    }

    /**
     * Scan for modules, updating every _modules.js in the project.
     */
    static scan() 
    {
        async function scanModule(moduleId) 
        {
            const modPath = Modules.path(moduleId);
            const modListFile = modPath + "/_modules.js"; 

            const submodules = Modules.submodules(moduleId);

            writeModlist(modListFile, submodules);

            for(let submoduleId of submodules)
                scanModule(moduleId + "." + submoduleId);
        }

        async function writeModlist(modListFile, submodules) {
            let js = ""; 

            for(let submodule of submodules) {
                js += "import " + submodule.toUpperCase() + " from './@modules/" + submodule + "'\n"
            }

            js += "\nexport default \n{\n"
            for(let submodule of submodules) {
                js += "    " + submodule + ": " + submodule.toUpperCase() + ",\n"
            }
            js += "}"

            fs.writeFileSync(modListFile, js);
        }
        
        scanModule("app");
    }
}

export default Modules; 