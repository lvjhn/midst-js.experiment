/** 
 * COMPONENT SCAFFOLDER
 */
import ModularPartScaffolder from "./bases/ModularPartScaffolder.js";

class ComponentScaffolder extends ModularPartScaffolder {

    defineOutputFolder() {
        return "components"
    }

    defineTemplateFile() 
    {
        return "./.midst/templates/components/component.template.vue"
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

export default ComponentScaffolder;