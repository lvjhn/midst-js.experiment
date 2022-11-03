/** 
 * COMPONENT SCAFFOLDER
 */
import ModularPartScaffolder from "./bases/ModularPartScaffolder.js";

class LayoutScaffolder extends ModularPartScaffolder {

    defineOutputFolder() {
        return "layouts"
    }

    defineTemplateFile() 
    {
        return "./.midst/templates/components/layout.template.vue"
    }

    defineReplaceMap(site) 
    {
        return {
            "#{COMPONENT_NAME}#" : this.lastName()
        } 
    }

    defineExtension() 
    {
        return "vue"
    }

    defineResolve(outStr) 
    {
        return outStr; 
    }

}

export default LayoutScaffolder;