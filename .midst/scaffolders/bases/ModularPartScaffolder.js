/** 
 * MODULAR PART SCAFFOLDER
 * Scaffolds files that needs to be put in a module. 
 */
import path from 'path'
import fs from 'fs'
import colors from 'colors'; 
import Modules from '../../utils/modules/Modules.js';

import BaseScaffolder from './BaseScaffolder.js';

class ModularPartScaffolder extends BaseScaffolder
{
    /** 
     * Create driver
     */
    create() 
    {
        const templateFile = this.defineTemplateFile(); 
        const templateStr = fs.readFileSync(templateFile).toString();
        const ext = this.defineExtension(); 

        const siteSpecParts = this.siteSpec.split("+");

        for(let site of siteSpecParts) {
            console.log("@ ----- Creating for " + site + " -----"); 
            
            const replaceMap = this.defineReplaceMap(site)
            console.log("@ Applying resolver."); 
            let outStr = this.defineResolve(templateStr, site, replaceMap); 
            
            console.log("@ Applying replace map.")
            for(let key in replaceMap) {
                const val = replaceMap[key]; 
                outStr = outStr.replaceAll(key, val);
            }

            /** ===== determine output file ===== */
            const modulePath = Modules.path(this.moduleId);
            const pathSpec = this.pathSpec;
            const outputFolder =  this.defineOutputFolder();
      
            const outFile = 
                modulePath + "/@sites/" + site + "/" + 
                outputFolder + "/" + pathSpec + "." + ext;
                
            console.log("@ Ensuring parent directories exists."); 
            const parentDir = path.dirname(outFile); 
            if(!fs.existsSync(parentDir))
                fs.mkdirSync(parentDir, { recursive: true }); 

            console.log("@ Writing to output file.");
            fs.writeFileSync(outFile, outStr);  
        }
    }

    /** 
     * Delete driver
     */
    delete() 
    {
        const siteSpecParts = this.siteSpec.split("+");
        const ext = this.defineExtension(); 

        for(let site of siteSpecParts) {
            const modulePath = Modules.path(this.moduleId);
            const pathSpec = this.pathSpec;
            const outputFolder =  this.defineoutputFolder();
      
            const outFile = 
                modulePath + "/@sites/" + site + "/" +
                outputFolder + "/" + pathSpec + "." + ext;

            this.tryDeleteFile(outFile, outStr);
        }
    }

 
}

export default ModularPartScaffolder;