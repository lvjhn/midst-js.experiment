/**
 * MODULE SCAFFOLDER
 * Scaffolds a module, interface to the utility tool.
 */
import fse from 'fs-extra'
import fs from 'fs'
import colors from 'colors'

import Modules from '../utils/modules/Modules.js'

import { execSync } from "child_process";

class ModuleScaffolder
{
    /**
     * Create a module 
     */
    static async create(moduleId, options) 
    {
        const modulePath = Modules.path(moduleId); 
        const templateFolder = "./.midst/templates/module"; 

        /** ----- Check if module already exists ----- */
        console.log("@ Checking if module already exists.");
        if(fs.existsSync(modulePath) && !("force" in options)) {
            console.log(colors.red("! Error: Module already exists, use --force to overwrite."));
            console.log("@ Aborted.") 
            process.exit();
        } 

        /** ----- Check if parent module does not exist ----- */
        console.log("@ Checking if parent module exists."); 
        const parentModuleId = Modules.parent(moduleId);
        const parentModulePath = Modules.path(parentModuleId); 
        if(!fs.existsSync(parentModulePath)) {
            console.log(colors.red("! Error: Parent module [" + parentModuleId + "] does not exist."));
            console.log("@ Aborted.") 
            process.exit();
        }

        /** ----- Copy module folder to output folder ----- */
        console.log("@ Copying template folder to output folder.");
        fse.copySync(templateFolder, modulePath); 

        /** ----- Configure index.js file ----- */
        console.log("@ Configuring index.js file of module.")
        
        const indexFile = modulePath + "/index.js"; 
        if(!fs.existsSync(indexFile))
            throw Error("Module's index.js file does not exist, in [" + moduleId + "]");
        let indexFileContent = fs.readFileSync(indexFile).toString(); 

        const injects = {
            "#{MODULE_NAME}#"       : options["module-name"]  ?? Modules.name(moduleId), 
            "#{ROUTE_PREFIX}#"      : options["prefix"] ?? Modules.name(moduleId),
            "#{ROUTE_PRE_PREFIX}#"  : options["pre-prefix"] ?? "", 
            "\"#{ROUTE_IS_ROOT}#\"" : options["root"]?.toString() ?? false
        }; 

        for(let inject in injects) 
            indexFileContent = indexFileContent.replaceAll(inject, injects[inject]); 
        
        /** ----- Create home.vue for mobile and www ----- */
        console.log("@ Creating home view for mobile and www")
        for(let site of ["www", "mobile"]) {
            execSync(`node midst ${moduleId} create:view ${site} home`);
        }
        
        fs.writeFileSync(indexFile, indexFileContent);
    }

    /**
     * Delete a module
     */
    static async delete(moduleId) 
    {
        const modulePath = Modules.path(moduleId); 

        /** ----- Check if module path exists ----- */ 
        console.log("@ Checking if module exists.")
        if(!fs.existsSync(modulePath)) {
            console.log(colors.red("! Module does not exist.")); 
            console.log("@ Aborted."); 
            process.exit();
        }

        /** ----- Delete module folder ----- */
        console.log("@ Deleting module folder."); 
        fs.rmSync(modulePath, { recursive: true }); 
    }
}

export default ModuleScaffolder; 