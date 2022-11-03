/** 
 * COMMAND-LINE UTILITY CALLER
 * Calls the command-line utility tool.
 */
import CLI from './.midst/cli/CLI.js'

export default (async () => {
    const rawArgs = process.argv.slice(2); 
    const cli = new CLI(rawArgs);
    await cli.start();
})();

