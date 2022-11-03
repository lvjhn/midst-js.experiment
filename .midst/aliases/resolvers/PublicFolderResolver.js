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

        const dirPath = 
            (folder) => folder + importeeTail;

        const pathMap = {
            '%public:' : () => dirPath('/.public')
        }

        const prePath = pathMap[alias](); 

        return prePath;
    }
}

export default PublicFolderResolver;