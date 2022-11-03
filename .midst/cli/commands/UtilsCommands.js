
/**
 * UTILITY COMMANDS
 * Defines different commands for utility context.
 */
import colors from 'colors';
import { exec } from 'child_process'

import Modules from '../../utils/modules/Modules.js';
import Routes from '../../utils/routes/Routes.js';

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

        if(command == "scan:modules")
            await this.scanModules();
        else if(command == "scan:routes")   
            await this.scanRoutes();

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
}

export default UtilsCommands;