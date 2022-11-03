/** 
 * BASE RESOLVER
 * Base resolver for different alias resolvers
 */
import fs from 'fs'

class BaseResolver 
{
    constructor(rootDir) 
    {
        this.rootPath = rootDir ?? process.cwd()

        this.context = {};
        this._aliases = [];

        this.initAliases();
    }
    
    /** 
     * Initialize aliases from defineAliases method.
     */
    initAliases() {
        const aliases = this.defineAliases();
        for(let alias of aliases) {
            this.defineAlias(alias);
        }
    }

    /**
     * Getter function for the resolver array
     */
    aliases() 
    {
        return this._aliases;
    }

    /** 
     * Resolver function, get's executed when alias is found
     */
    defineResolver(alias, importer, importee) {
        throw Error("This method (defineResolver) must be defined manually.");
    }

    /**
     * Registers a single alias to resolve 
     */
    defineAlias(alias) 
    {
        const self = this; 

        const aliasResolve = {
            find: alias, 
            customResolver(importee, importer) {

                // fix alias marked as undefined
                self.context.alias = alias;
                
                importee = self.fixImportee(importee);
                
                self.context.importee = importee; 
                self.context.importer = importer;

                const prefinalPath = 
                    self.defineResolver(alias, importee, importer);

                const finalPath =
                    self.finalizePath(prefinalPath);
                    
                self.checkExistence(finalPath);

                return finalPath; 
            }           
        };


        this._aliases.push(aliasResolve);
    }

    /**
     * Defines multiple aliases to resolve
     */
    defineAliases(aliases) 
    {       
        throw Error("This method (defineAliases) must be defined manually.");
    }

    /** 
     * Check existence of path. 
     */
    checkExistence(path) 
    {
        if(!fs.existsSync(path)) {
            let message;

            const alias = this.context.alias; 
            const targetFile = "project:/" + path.split(this.rootPath).join("");
            const importee = this.context.importee;
            const importer =  "project:/" + this.context.importer.split(this.rootPath).join("");

            message += "\nFile does not exist when resolving alias. \n"; 
            message += "-----------------------------------------------------\n";
            message += "Alias        : " + alias + "\n"
            message += "Target File  : " + targetFile + "\n";
            message += "Importee     : " + importee + "\n";
            message += "Importer     : " + importer + "\n";
            message += "Project      : " + this.rootPath + "\n";

            throw Error(message); 
        }
    }

    /** 
     * Finalize path: Apply root path, folder and extension normalization
     */
    finalizePath(prefinalPath) 
    {
        let finalPath = prefinalPath; 
        
        finalPath = this.normalizeRootPath(finalPath);
        finalPath = this.normalizeFolder(finalPath)
        finalPath = this.normalizeExtension(finalPath);

        return finalPath;
    }

    /** 
     * Apply Root Path Normalization
     */
    normalizeRootPath(path) 
    {
        let normPath; 

        if(path[0] != "/") 
            path = "/" + path

        normPath = this.rootPath + path; 

        return normPath;
    }

    /** 
     * Apply Folder Normalization
     */
    normalizeFolder(path) 
    {
        let normPath; 

        if(fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
            normPath = path + "/index.js"
        }
        else {
            normPath = path;
        }

        return normPath; 
    }

    /** 
     * Apply Extension Normalization
     */
    normalizeExtension(path) 
    {   
        let normPath; 
        let candidateJSFile = path + ".js"; 

        if(fs.existsSync(candidateJSFile)) {
            normPath = candidateJSFile;
        }
        else {
            normPath = path; 
        }

        return normPath; 
    }

    /** 
     * Get the tail of the importee, removes alias.
     */
    importeeTail() 
    {
        const importee = this.context.importee; 
        const alias = this.context.alias; 
        const normImportee = importee.split(alias + "/").join(""); 
        return normImportee; 
    }

    /** 
     * Get the tail of the importer, removes path. 
     */
    importerTail() 
    {
        const importer = this.context.importer; 
        const rootPath = this.rootPath; 
        const normImporter = importer.split(rootPath + "/").join("");
        return normImporter;
    }

    /** 
     * Fix importee (remove undefined/ part)
     */
    fixImportee(importee) 
    {
        const alias = this.context.alias; 
        const tokens = importee.split(/^undefined/);

        if(tokens[0] == "") {
            tokens[0] = alias; 
            const _importee = tokens.join("");
            return _importee
        }

        return importee;
    }


}

export default BaseResolver;