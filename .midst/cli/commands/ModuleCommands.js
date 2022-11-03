
/**
 * MODULE COMMANDS
 * Defines different commands for module context.
 */
import colors from 'colors'
import Modules from '../../utils/modules/Modules.js';

import ModuleScaffolder from "../../scaffolders/ModuleScaffolder.js";
import ViewScaffolder from '../../scaffolders/ViewScaffolder.js';

class ModuleCommands 
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


        // ----- modules ----- //
        if(command == "create:module")
            this.createModule(); 
        else if(command == "delete:module")
            this.deleteModule();
            
        // ----- views ----- //
        else if(command == "create:view") 
            this.createView(); 
        else if(command == "delete:view")   
            this.deleteView(); 

        else {
            console.log(colors.red("@ Unknown command [" + command + "]")); 
            process.exit();
        }
    }

    /** ===== HELPER FUNCTIONS ===== */

    /**
     * Get the full module id from the supplied arguments.
     */
    fullModuleId() 
    {
        const { context, options } = this.context.parsedArgs;

        const head = context;
        const tail = options[0];
        const moduleId = head + (tail ? "." + tail : "");

        return moduleId;
    }

    /** ===== MODULE COMMANDS ===== */

    /**
     * Module creation command handler
     */
    async createModule() 
    {
        const { context, command, options, kwOptions } = this.context.parsedArgs;
        const moduleId = this.fullModuleId(); 

        console.log("@ Creating module [" + moduleId + "]."); 
        await ModuleScaffolder.create(moduleId, kwOptions); 
        await Modules.scan();
        console.log(colors.green("@ Done."));
    }

    /**
     * Module deletion command handler
     */
    async deleteModule() 
    {
        const { context, command, options, kwOptions } = this.context.parsedArgs;
        const moduleId = this.fullModuleId(); 

        console.log("@ Deleting module [" + moduleId + "]"); 
        await ModuleScaffolder.delete(moduleId); 
        await Modules.scan();
        console.log(colors.green("@ Done."));
    }

    /** ===== VIEW COMMANDS ===== */

    /**
     * View creation command handler
     */
    async createView() 
    {
        const { context, command, options, kwOptions } = this.context.parsedArgs;
        const moduleId = context;

        console.log("@ Creating view [" + moduleId + ":" + options[0] + ":" + options[1] + "]."); 
        const scaffolder = new ViewScaffolder(moduleId, options[0], options[1]);
        scaffolder.create(); 
        console.log(colors.green("@ Done."));
    }

    /**
     * View deletion command handler
     */
    async deleteView() 
    {
        const { context, command, options, kwOptions } = this.context.parsedArgs;
        const moduleId = context;

        console.log("@ Deleting view ["  + moduleId + ":" + options[0] + ":" + options[1] + "]"); 
        const scaffolder = new ViewScaffolder(moduleId, options[0], options[1]);
        scaffolder.delete(); 
        console.log(colors.green("@ Done."));
    }
}

export default ModuleCommands;