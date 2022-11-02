/** 
 * ARGUMENT PARSER 
 * Parses CLI args to their respective parts.
 */
class ArgsParser 
{
    constructor() 
    {
        this.context   = null; 
        this.command   = null;
        this.options   = []; 
        this.kwOptions = {}; 
    }

    /**
     * Calls the necessary steps in parsing the arguments
     */
    parse() 
    {
        this.identifyContext(); 
        this.identifyCommand();
        this.identifyOptions(); 
        this.identifyKwOptions(); 
    }

    /**
     * Identifies the context from the arguments
     */
    identifyContext() 
    {

    }

    /**
     * Identifies the command from the arguments
     */
    identifyCommand() 
    {

    }

    /** 
     * Identifies the options from the arguments
     */
    identifyOptions() 
    {
        
    }

    /**
     * Identifies the keyword options from the arguments
     */
    identifyKwOptions()     
    {

    }
}