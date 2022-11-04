/** 
 * COMMAND-LINE UTILITY
 * Command line utility tool. 
 */
import { execSync } from 'child_process'
import colors from 'colors';

import ArgsParser from "./ArgsParser.js";

import ModuleCommands from "./commands/ModuleCommands.js";
import UtilsCommands from "./commands/UtilsCommands.js";

class CLI 
{   
    constructor(rawArgs)
    {
        this.rawArgs = rawArgs;
        this.parsedArgs = null; 
    }

    /**
     * Starts the CLI
     */
    async start() 
    {
        await this.checkArgs(); 
        await this.parseArgs();
        await this.parseRoutes();
        await this.handleRestart();
    }

    /**
     * Applies restarting feature
     */
    async handleRestart() 
    {
        if("restart" in this.parsedArgs.kwOptions)
            execSync('touch vite.config.js');
        if("hard-restart" in this.parsedArgs.kwOptions) {
            console.log("@ Scanning modules.")
            execSync('node midst utils scan:modules');
            console.log("@ Scanning routes.")
            execSync('node midst utils scan:routes');
            console.log("@ Scanning main files.")
            execSync('node midst utils scan:mains');
            console.log("@ Scanning subroot files.");
            execSync('node midst utils scan:subroots');
            console.log("@ Restarting dev server.");
            execSync('touch vite.config.js');
            console.log(colors.green("@ Done."))
        }
    } 

    /** 
     * Initial check on whether the arguments are valid. 
     */
    async checkArgs() 
    {
        if(this.rawArgs < 2) {
            console.log(colors.yellow("Error      : This command-line tool requires at least two arguments.")); 
            console.log(colors.yellow("Usage      : node midst [context] [command] [options]? [keyword-options]?")); 
            console.log(colors.yellow("Examples   : ")); 
            console.log(colors.yellow("   > node midst utils create:env"));
            console.log(colors.yellow("   > node midst app create:module sign_up"));
            console.log(colors.yellow("   > node midst app.main create:view www edit"));
            process.exit();
        }
    }

    /**  
     * Parses arguments to pars 
     */
    async parseArgs() 
    {
        this.parsedArgs = (new ArgsParser(this.rawArgs))
        this.parsedArgs.parse();
    }

    /**
     * Parses command route to its respective command router.
     */
    async parseRoutes() 
    {
        const context = this.parsedArgs.context; 

        if(context == "utils") 
            await (new UtilsCommands(this)).handle(); 
        else if(context.split(".")[0] == "app") 
            await (new ModuleCommands(this)).handle();

    }
} 

export default CLI;