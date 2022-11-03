/** 
 * BASE SCAFFOLDER
 * Defines common functions to the scaffolders.
 */
import colors from 'colors'
import fs from 'fs'
import path from "path" 

class BaseScaffolder 
{
    constructor(moduleId, pathSpec, siteSpec, otherOptions) 
    {
        this.moduleId = moduleId; 
        this.pathSpec = pathSpec;
        this.siteSpec = siteSpec;
        this.otherOptions = otherOptions;
    }

    /**
     * Define the template file for the
     */
    defineTemplateFile() 
    {
        throw Error("This method (defineTemplateFile) must be defined manually.");
    }

    /** 
     * Define the replace map 
     */
    defineReplaceMap() 
    {
        throw Error("This method (defineReplaceMap) must be defined manually.");
    }

    /** 
     * Define the extension 
     */
    defineExtension() 
    {
        throw Error("This method (defineExtension) must be defined manually.");
    }

    /** 
     * Define the extension 
     */
    defineOutputFolder() 
    {
        throw Error("This method (defineExtension) must be defined manually.");
    }

    /** 
     * Define resolver function
     */
    defineResolve() 
    {
        throw Error("This method (defineResolver) must be defined manually.");
    }

    /** 
     * Gets the last name of a pathSpec (the last part)
     */
    lastName() 
    {
        return this.pathSpec.split("/").at(-1);
    }

    /**
     * Try to delete file in the scaffolding manner.
     */
    tryDeleteFile(outFile) 
    {
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

    /**
     * Try to create file in the scaffolding manner.
     */
    tryCreateFile(outFile, outStr) 
    {
        console.log("@ Checking if item exists already.") 
        if(fs.existsSync(outFile) && !("force" in this.otherOptions)) {
            console.log(colors.red("! Error: Item already exists, use --force to overwrite."));
            console.log("@ Aborted.") 
            process.exit();
        } 

        console.log("@ Ensuring parent directories exists."); 
        const parentDir = path.dirname(outFile); 
        if(!fs.existsSync(parentDir))
            fs.mkdirSync(parentDir, { recursive: true }); 

        console.log("@ Writing to output file.");
        fs.writeFileSync(outFile, outStr);  
    }
}

export default BaseScaffolder;