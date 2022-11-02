/** 
 * ROOT FOLDER RESOLVER
 * Resolves aliases in root folder context.
 */
import BaseResolver from "../BaseResolver"

class RootFolderResolver extends BaseResolver
{   
    defineAliases() {
        return [
            "^", 
            "^midst:", 
            "^public:", 
            "^src:", 
            "^temp:" 
        ];
    }

    defineResolver(alias, importee, importer) {
        
        const rootPath = this.rootPath;
        const importeeTail = this.importeeTail(); 
        const importerTail = this.importerTail();

        const dirSandwitch = 
            (folder) => rootPath + folder + importeeTail;

        const pathMap = {
            '^'         : () => dirSandwitch('/'), 
            '^midst:'   : () => dirSandwitch('/.midst/'), 
            '^public:'  : () => dirSandwitch('/public/'),
            '^src:'     : () => dirSandwitch('/src'), 
            '^temp:'    : () => dirSandwitch('/temp/')
        }

        const prePath = pathMap[alias](); 

        return prePath;
    }
}

export default RootFolderResolver