/** 
 * MIDST FOLDER RESOLVER
 * Resolves aliases in midst folder context.
 */
import BaseResolver from "../BaseResolver"

class MidstFolderResolver extends BaseResolver
{   
    /**
     * Define aliases for the resolver.
     */
    defineAliases() {
        return ["&midst:"];
    }
    
    /**
     * Define resolver function.
     */
    defineResolver(alias, importee, importer) {

        const rootPath = this.rootPath;
        const importeeTail = this.importeeTail(); 
        const importerTail = this.importerTail();

        const dirSandwitch = 
            (folder) => rootPath + folder + importeeTail;

        const pathMap = {
            '&midst:' : () => dirSandwitch('/.midst')
        }

        const prePath = pathMap[alias](); 

        return prePath;
    }
}

export default MidstFolderResolver;