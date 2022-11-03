/** 
 * ARGUMENT PARSER 
 * Parses CLI args to their respective parts.
 */
class ArgsParser 
{
    constructor(args) 
    {   
        this.args = args;
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
        this.context = this.args[0];
    }

    /**
     * Identifies the command from the arguments
     */
    identifyCommand() 
    {
        this.command = this.args[1];
    }

    /** 
     * Identifies the options from the arguments
     */
    identifyOptions() 
    {
        this.options = this.args.slice(2, this.identifyBoundary()); 
    }

    /**
     * Identifies the keyword options from the arguments
     */
    identifyKwOptions()     
    {
        const args = this.args.slice(this.identifyBoundary());  
        const normArgs = {}; 
        for(let arg of args) {
            const tokens = arg.split("="); 
            normArgs[tokens[0].substring(2)] = tokens[1]; 
        }
        this.kwOptions = normArgs; 
    }

    /**
     * Identifies the boundary between options and kw-options
     */
    identifyBoundary() 
    {
        for(let i = 0; i < this.args.length; i++) {
            if(this.args[i].length >= 2 && this.args[i].substring(0, 2) == "--") {
                return i;
            }
        }
        return this.args.length;
    }
}

export default ArgsParser;