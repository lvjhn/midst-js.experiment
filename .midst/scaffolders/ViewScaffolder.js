/** 
 * VIEW SCAFFOLDER
 */
import ModularPartScaffolder from "./bases/ModularPartScaffolder.js";

class ViewScaffolder extends ModularPartScaffolder {

    defineOutputFolder() {
        return "views"
    }

    defineTemplateFile() 
    {
        return "./.midst/templates/components/view.template.vue"
    }

    defineReplaceMap(site) 
    {
        return {
            "#{SITE_NAME}#" : site, 
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

export default ViewScaffolder;