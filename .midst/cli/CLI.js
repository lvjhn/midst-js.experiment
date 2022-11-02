/** 
 * COMMAND-LINE UTILITY
 * Command line utility tool. 
 */

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
        await this.parseRoutes();
        await this.route();
    }

    /**
     * Parses command route to its respective command router.
     */
    async parseRoutes() 
    {

    }

    async route() 
    {

    }
} 

export default CLI;