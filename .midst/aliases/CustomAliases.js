/**
 * CUSTOM ALIASES 
 * Class to load different alias resolvers
 */
import RootFolderResolver from "./resolvers/RootFolderResolver"
import MidstFolderResolver from "./resolvers/MidstFolderResolver";

class CustomAliases 
{
    constructor() 
    {
        this.rootDir = process.cwd() 
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
            ...(new ResolverClass()).aliases()
        ];
    }

    /**
     * Integrates different resolver classes
     */
    defineResolvers() 
    {
        return [
            RootFolderResolver, 
            MidstFolderResolver
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

