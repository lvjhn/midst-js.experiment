/** 
 * VIEW SCAFFOLDER
 */
import ModularPartScaffolder from "./bases/ModularPartScaffolder.js";

class ViewScaffolder extends ModularPartScaffolder {

    defineOutputContainer() {
        return "views"
    }

    defineTemplateFile() 
    {
        return "./.midst/templates/components/view.template.vue"
    }

    defineReplaceMap(site) 
    {
        return {} 
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