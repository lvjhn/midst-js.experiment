/** 
 * LIBRARY SCAFFOLDER
 * Scaffolds library files.
 */
import GeneralSourceFileScaffolder from "./bases/GeneralSourceFileScaffolder.js"

class SettingsScaffolder extends GeneralSourceFileScaffolder 
{
    defineTemplateFile() 
    {
        return "./.midst/templates/scripts/settings.template.js"
    }

    defineOutputFolder() 
    {
        return "config/settings"
    } 

    defineExtension() 
    {
        return "js";
    }

    defineReplaceMap() 
    {
        return {
            "#{SETTINGS_NAME}#" : this.lastName()
        }
    }


    defineResolve(outStr) 
    {
        return outStr 
    }
}

export default SettingsScaffolder;