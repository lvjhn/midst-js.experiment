/**
 * GENERIC BASE SCAFFOLDER
 * Designed for app parts that gets put under src/ folder
 * and does not require any complicated module handling.
 */
import fs from 'fs'
import path from 'path'

import BaseScaffolder from "./BaseScaffolder.js";

class GeneralSourceFileScaffolder extends BaseScaffolder
{
    /** 
     * Define creation
     */
    create() 
    {
        const templateFile = this.defineTemplateFile(); 
        const outputFolder = this.defineOutputFolder(); 
        const extension = this.defineExtension();
        const replaceMap = this.defineReplaceMap(); 
        const resolve = this.defineResolve;

        console.log("@ Loading template file."); 
        let outStr = fs.readFileSync(templateFile).toString(); 
        outStr = resolve(outStr);

        console.log("@ Applying replace map.")
        for(let key in replaceMap) {
            const val = replaceMap[key]; 
            outStr = outStr.replaceAll(key, val);
        }

        /** ===== determine output file ===== */
        const outFile = "./src/" + outputFolder + "/" + this.pathSpec + ".js"

        this.tryCreateFile(outFile, outStr);
    }

    /** 
     * Define deletion 
     */
    delete() 
    {   
        const templateFile = this.defineTemplateFile(); 
        const outputFolder = this.defineOutputFolder(); 
        const extension = this.defineExtension();
        const replaceMap = this.defineReplaceMap(); 
        const resolve = this.defineResolve;

    
        /** ===== determine output file ===== */
        const outFile = "./src/" + outputFolder + "/" + this.pathSpec + ".js"

        this.tryDeleteFile(outFile);
    }
}

export default GeneralSourceFileScaffolder;