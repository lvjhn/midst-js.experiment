/** 
 * ROOT FOLDER RESOLVER
 * Resolves aliases in root folder context.
 */
import BaseResolver from "../BaseResolver"

class RootFolderResolver extends BaseResolver
{   
    /**
     * Define aliases for the resolver.
     */
    defineAliases() {
        return [
            "^", 
            "^midst:", 
            "^public:", 
            "^src:", 
            "^temp:" 
        ];
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
            '^'         : () => dirPath('/'), 
            '^midst:'   : () => dirPath('/.midst/'), 
            '^public:'  : () => dirPath('/public/'),
            '^src:'     : () => dirPath('/src'), 
            '^temp:'    : () => dirPath('/temp/')
        }

        const prePath = pathMap[alias](); 

        return prePath;
    }
}

export default RootFolderResolver