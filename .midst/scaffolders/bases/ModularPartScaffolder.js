/** 
 * MODULAR PART SCAFFOLDER
 * Scaffolds files that needs to be put in a module. 
 */
import path from 'path'
import fs from 'fs'
import colors from 'colors'; 
import Modules from '../../utils/modules/Modules.js';

class ModularPartScaffolder 
{
    constructor(moduleId, siteSpec, pathSpec) 
    {
        this.moduleId = moduleId; 
        this.pathSpec = pathSpec;
        this.siteSpec = siteSpec;
    }

    /**
     * Placeholder function for the template file definition. 
     */
    defineTemplateFile() 
    {
        return ""; 
    }

    /** 
     * Placehoder for the resolver function for template file content.
     */
    defineResolve(templateStr, site) 
    {
        return ""; 
    }

    /** 
     * Placeholder for replace map definition. 
     */
    defineReplaceMap(templateStr, site, replaceMap) 
    {
        return {}; 
    }

    /** 
     * Placeholder for output container
     */
    defineOutputContainer() 
    {
        return "components/"
    }

    /** 
     * Placeholder for extension
    */
    defineExtension() 
    {
        return "vue"
    }


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
            
            console.log("@ Resolving replace map.")
            for(let key in replaceMap) {
                const val = replaceMap[key]; 
                outStr.replaceAll[key] = val;
            }

            const modulePath = Modules.path(this.moduleId);
            const pathSpec = this.pathSpec;
            const outputContainer =  this.defineOutputContainer();
      
            const outFile = 
                modulePath + "/@sites/" + site + "/" + 
                outputContainer + "/" + pathSpec + "." + ext;
            const parentDir = path.dirname(outFile); 

            console.log("@ Ensuring parent directories exists."); 
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
            const outputContainer =  this.defineOutputContainer();
      
            const outFile = 
                modulePath + "/@sites/" + site + "/" +
                outputContainer + "/" + pathSpec + "." + ext;

            if(fs.existsSync(outFile)) {
                console.log("@ File found, deleting.")
                fs.unlinkSync(outFile);
                
                console.log("@ Pruning anscestor folders until the first non-empty."); 
                let ansPath = path.dirname(outFile); 
                while(fs.readdirSync(ansPath).length == 0) {
                    fs.rmSync(ansPath, { recursive: true }); 
                    ansPath = path.dirname(ansPath); 
                }
            } 
            else {
                console.log(colors.yellow("! File not found, skipping.")); 
            }
        }
    }
}

export default ModularPartScaffolder;