/** 
 * MODULE FOLDER RESOLVER
 * Resolves aliases in module context. 
*/

import BaseResolver from "../BaseResolver"

import Modules from "../../utils/modules/Modules";

class ModuleFolderResolver extends BaseResolver
{   
    /**
     * Define aliases for the resolver.
     */
    defineAliases() {
        return [
            "#module:", 
            "#site:", 
            "#www:", 
            "#mobile:", 
            "#common:"
        ];
    }
    
    /**
     * Define resolver function.
     */
    defineResolver(alias, importee, importer) {

        const rootPath = this.rootPath;
        const importeeTail = this.importeeTail(); 
        const importerTail = this.importerTail();

        const dirPath = 
            (folder) => folder + importeeTail;

        const pathMap = {
            "#module:"      : () => this.handleModuleAlias(), 
            "#site:"        : () => this.handleSiteAlias(), 
            "#www:"         : () => this.handleWwwAlias(), 
            "#mobile:"      : () => this.handleMobileAlias(),
            "#common:"      : () => this.handleCommonAlias()
        }

        const prePath = pathMap[alias](); 

        return prePath;
    }

    /**
     * Handle Module Alias
     */
    handleModuleAlias() 
    {
        /** 
         * RULES: 
         *      #module:/app.installer/index.js              - from anywhere     
         *      #module://-//installer//index.js             - inside app.installer 
         *      #module://--//installer.sign_up//index.js    - inside app.installer
         *      #module://.//installer//index.js             - inside app.installer 
         *      #site://                                     - inside a module
         *      #mobile://                                   - inside a module
         *      #www://                                      - inside a module
         *      #common://                                   - inside a module
         */
        const importee = this.context.importee;
        const importer = this.context.importer;
        const importeeTail = this.importeeTail();
        const importerTail = this.importerTail(); 
        
        const relative = importee.startsWith("#module://")
        const absolute = importee.startsWith("#module:/")

        if(relative) {
            let importeeTailNorm; 

            if(importeeTail[0] == "/")
                importeeTailNorm = importeeTail.substring(1); 

            const parts = importeeTailNorm.split("//"); 
            const head = parts[0]; 
            
            const candidateParent = head.match(/\-+/);

            if(head == ".") {
                const modulePath = Modules.path(Modules.id(importerTail)); 
                const tail = parts.slice(1).join("/");
                const prefinalPath = modulePath + "/" + tail; 
                return prefinalPath;
            }
            else if(candidateParent) {
                const parent = candidateParent[0];
                const parentId = Modules.parent(Modules.id(importerTail), parent.length);
                const subId = parts[1]; 
                const computedId = parentId + "." + subId; 
                const tail = parts.slice(2).join("/")
                const modulePath = Modules.path(computedId); 
                const prefinalPath = "/" + modulePath + "/" + tail; 
                return prefinalPath
            }
        }
        else if(absolute) {
            const parts = importeeTail.split("/"); 
            const head = parts[0];
            const tail = parts.slice(1).join("/");
            const modulePath = Modules.path(head); 
            const prefinalPath = modulePath + "/" + tail; 
            return prefinalPath; 
        }
    }

    /** 
     * Handle site alias
     */
    handleSiteAlias() 
    {
        const importee = this.context.importee;
        const importer = this.context.importer;
        const importeeTail = this.importeeTail();
        const importerTail = this.importerTail(); 

        const moduleId = Modules.id(importerTail); 
        const modulePath = Modules.path(moduleId); 
        const sitesPath = modulePath + "/@sites"; 

        let tail = importeeTail;
        let site = importerTail.split(modulePath + "/@sites")[1].split("/")[1]; 
        const prefinalPath = sitesPath + "/" + site + "/" + tail; 
        
        return prefinalPath;
    }

    /** 
     * Handle subsite aliases
     * 
     */
    handleSubsiteAlias(site) 
    {
        const importee = this.context.importee;
        const importer = this.context.importer;
        const importeeTail = this.importeeTail();
        const importerTail = this.importerTail(); 

        const moduleId = Modules.id(importerTail); 
        const modulePath = Modules.path(moduleId); 
        const sitesPath = modulePath + "/@sites"; 

        let tail = importeeTail;
        
        const prefinalPath = sitesPath + "/" + site + "/" + tail; 
        
        return prefinalPath;
    }

    /**
     * Handle WWW Alias
     */
    handleWwwAlias() 
    {
        return this.handleSubsiteAlias("www");
    }   

    /**
     * Handle Mobile Alias
     */
    handleMobileAlias() 
    {
        return this.handleSubsiteAlias("mobile");
    }

    /**
     * Handle Common alisa
     */
    handleCommonAlias() 
    {
        return this.handleSubsiteAlias("common");
    }
}

export default ModuleFolderResolver;