
/**
 * UTILITY COMMANDS
 * Defines different commands for utility context.
 */
import colors from 'colors';
import fs from 'fs'

import Modules from '../../utils/modules/Modules.js';
import Routes from '../../utils/routes/Routes.js';

import LibraryScaffolder from '../../scaffolders/LibraryScaffolder.js';
import SettingsScaffolder from '../../scaffolders/SettingsScaffolder.js';

class UtilsCommands 
{
    constructor(context) 
    {
        this.context = context; 
    }

    /**
     * Handle command, route args to proper command handler.
     */
    async handle() 
    {
        const { context, command, options, kwOptions } = this.context.parsedArgs;

        
        if(command == "create:env") 
            await this.createEnv(); 
        
        else if(command == "scan:modules")
            await this.scanModules();
        else if(command == "scan:routes")   
            await this.scanRoutes();
        else if(command == "scan:mains")   
            await this.scanMains();
        else if(command == "scan:subroots")   
            await this.scanSubroots();

        else if(command == "create:library")
            await this.createLibrary(); 
        else if(command == "delete:library")
            await this.deleteLibrary();
        
        else if(command == "create:settings")
            await this.createSettings(); 
        else if(command == "delete:settings")
            await this.deleteSettings();

        else {
            console.log(colors.red("@ Unknown command [" + command + "]")); 
            process.exit();
        }
    }

    /**
     * Scan modules and update _modules.js file of each module.
     */
    async scanModules() 
    {
        console.log("@ Scanning modules.");
        await Modules.scan();
        console.log(colors.green("@ Done."));
    }


    /**
     * Scan modules and update /@sites/[site]/routes/_auto.js file of each module.
     */
    async scanRoutes() 
    {
        console.log("@ Scanning routes.");
        await Routes.scan();
        console.log(colors.green("@ Done."));
    }

    /**
     * Scan modules for subroot files and update @start://runtime/subroot.map.js
     */
    async scanSubroots() 
    {
        console.log("@ Scanning subroot files.");
        await Modules.scanSubroots();
        console.log(colors.green("@ Done."));
    }

    /**
     * Scan modules for main files and update @start://runtime/main.map.js
     */
    async scanMains() 
    {
        console.log("@ Scanning main files.");
        await Modules.scanMains();
        console.log(colors.green("@ Done."));
    }

    /** 
     * Create environment file by copying the one in the templates. 
     */
    async createEnv() 
    {
        console.log("@ Creating environment file."); 

        if(fs.existsSync(".env") && !("force" in this.context.parsedArgs.kwOptions)) {
            console.log(colors.red("! Error: Item already exists, use --force to overwrite."));
            console.log("@ Aborted.") 
            process.exit();
        } 

        fs.copyFileSync("./.midst/templates/env/.env.template", ".env");  
        console.log(colors.green("@ Done.")); 
    }

    /** 
     * Generic source file scaffolding
     */
    async genericSourceFileScaffolding(label, Scaffolder, mode) 
    {
        const { context, command, options, kwOptions } = this.context.parsedArgs;
        const moduleId = context;

        let operation;
        
        if(mode == "create") 
            operation = "Creating"
        else if(mode == "delete") 
            operation = "Deleting"
            
        console.log("@ " + operation + " " + label + " [" + options[0] + "]."); 
        const scaffolder = new Scaffolder(moduleId, options[0], null, kwOptions);
        scaffolder[mode](); 
        console.log(colors.green("@ Done."));
    }

    /** 
     * Library creation command
     */
    async createLibrary() 
    {
        await this.genericSourceFileScaffolding("library", LibraryScaffolder, "create")
    }

    /**
     * Library deletion command
     */
    async deleteLibrary() 
    {
        await this.genericSourceFileScaffolding("library", LibraryScaffolder, "delete")
    }

    /** 
     * Settings creation command
     */
    async createSettings() 
    {
        await this.genericSourceFileScaffolding("settings", SettingsScaffolder, "create")
    }

    /**
     * Settings deletion command
     */
    async deleteSettings() 
    {
        await this.genericSourceFileScaffolding("settings", SettingsScaffolder, "delete")
    }
    
}

export default UtilsCommands;