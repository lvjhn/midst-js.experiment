/** 
 * COMMAND-LINE UTILITY CALLER
 * Calls the command-line utility tool.
 */
import CLI from "./.midst/cli/CLI";

const rawArgs = process.slice(2); 
const cli = new CLI(rawArgs);
await cli.start();