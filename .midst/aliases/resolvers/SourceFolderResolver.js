/** 
 * SOURCE FOLDER RESOLVER
 * Resolves aliases in source folder context.
 */
import BaseResolver from "../BaseResolver"

class SourceFolderResolver extends BaseResolver
{   
    /**
     * Define aliases for the resolver.
     */
    defineAliases() {
        return [
            '@',
            '@app:',
            '@assets:',
            '@scripts:'
        ];
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
            '@'             : () => dirSandwitch('/src'),
            '@app:'         : () => dirSandwitch('/src/app'),
            '@assets:'      : () => dirSandwitch('/src/assets'), 
            '@config'       : () => dirSandwitch('/src/config'),
            '@libraries'    : () => dirSandwitch('/src/config/libraries'),
            '@registries'   : () => dirSandwitch('/src/config/registries'),
            '@settings'     : () => dirSandwitch('/src/config/settings'),
            '@scripts:'     : () => dirSandwitch('/src/scripts'), 
            '@start:'       : () => dirSandwitch('/src/start'), 
            '@helpers:'     : () => dirSandwitch('/src/start/helpers'),
            '@facades:'     : () => dirSandwitch('/src/start/facades')
        }

        const prePath = pathMap[alias](); 

        return prePath;
    }
}

export default SourceFolderResolver;