/** 
 * PUBLIC FOLDER RESOLVER
 * Resolves aliases in public folder context.
 */
import BaseResolver from "../BaseResolver"

class PublicFolderResolver extends BaseResolver
{   
    /**
     * Define aliases for the resolver.
     */
    defineAliases() {
        return ["%public:"];
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
            '%public:' : () => dirSandwitch('/.public')
        }

        const prePath = pathMap[alias](); 

        return prePath;
    }
}

export default PublicFolderResolver;