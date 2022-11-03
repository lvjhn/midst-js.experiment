/** 
 * VIEW SCAFFOLDER
 */
import ModularPartScaffolder from "./bases/ModularPartScaffolder.js";

class StoreScaffolder extends ModularPartScaffolder {

    defineOutputFolder() {
        return "stores"
    }

    defineTemplateFile() 
    {
        return "./.midst/templates/scripts/store.template.js"
    }

    defineReplaceMap(site) 
    {
        return {
            "#{STORE_ID}#" : this.moduleId + ":" + this.siteSpec + ":" + this.pathSpec
        } 
    }

    defineExtension() 
    {
        return "js"
    }

    defineResolve(outStr) 
    {
        return outStr; 
    }

}

export default StoreScaffolder;