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

        const dirPath = 
            (folder) => folder + importeeTail;

        const pathMap = {
            '&midst:' : () => dirPath('/.midst')
        }

        const prePath = pathMap[alias](); 

        return prePath;
    }
}

export default MidstFolderResolver;