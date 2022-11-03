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
            '@config',      
            '@libraries',    
            '@registries',  
            '@settings',     
            '@scripts:',   
            '@start:',    
            '@helpers:',    
            '@facades:'  
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
            '@'             : () => dirPath('/src/'),
            '@app:'         : () => dirPath('/src/app'),
            '@assets:'      : () => dirPath('/src/assets'), 
            '@config'       : () => dirPath('/src/config'),
            '@libraries'    : () => dirPath('/src/config/libraries'),
            '@registries'   : () => dirPath('/src/config/registries'),
            '@settings'     : () => dirPath('/src/config/settings'),
            '@scripts:'     : () => dirPath('/src/scripts'), 
            '@start:'       : () => dirPath('/src/start'), 
            '@helpers:'     : () => dirPath('/src/start/helpers'),
            '@facades:'     : () => dirPath('/src/start/facades')
        }

        const prePath = pathMap[alias](); 

        return prePath;
    }
}

export default SourceFolderResolver;