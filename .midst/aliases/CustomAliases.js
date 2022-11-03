/**
 * CUSTOM ALIASES 
 * Class to load different alias resolvers
 */
import RootFolderResolver from "./resolvers/RootFolderResolver"
import MidstFolderResolver from "./resolvers/MidstFolderResolver";
import SourceFolderResolver from "./resolvers/SourceFolderResolver";
import PublicFolderResolver from "./resolvers/PublicFolderResolver";
import ModuleFolderResolver from "./resolvers/ModuleFolderResolver";

class CustomAliases 
{
    constructor(rootDir) 
    {
        this.rootDir = rootDir ?? process.cwd() 
        this._resolvers = [];

        this.initResolvers();
    }

    /**
     * Initialize resolvers
     */
    initResolvers() 
    {
        const resolvers = this.defineResolvers(); 
        for(let Resolver of resolvers) {
            this.defineResolver(Resolver);
        }
    }

    /** 
     * Integrates the aliases of a resolver class
     */
    defineResolver(ResolverClass) 
    {
        this._resolvers = [
            ...this._resolvers, 
            ...(new ResolverClass(this.rootDir)).aliases()
        ];
    }

    /**
     * Integrates different resolver classes
     */
    defineResolvers() 
    {
        return [
            RootFolderResolver, 
            MidstFolderResolver,
            PublicFolderResolver,
            SourceFolderResolver,
            ModuleFolderResolver
        ]
    }   

    /**
     * Getter for the list of resolvers
     */
    resolvers() 
    {
        return this._resolvers;
    }
}

export default CustomAliases;

