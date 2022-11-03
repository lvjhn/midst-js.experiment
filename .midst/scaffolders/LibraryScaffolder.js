/** 
 * LIBRARY SCAFFOLDER
 * Scaffolds library files.
 */
import GeneralSourceFileScaffolder from "./bases/GeneralSourceFileScaffolder.js"

class LibraryScaffolder extends GeneralSourceFileScaffolder 
{
    defineTemplateFile() 
    {
        return "./.midst/templates/scripts/library.template.js"
    }

    defineOutputFolder() 
    {
        return "config/libraries"
    } 

    defineExtension() 
    {
        return "js";
    }

    defineReplaceMap() 
    {
        return {
            "#{UPPERCASE_LIBRARY_NAME}#" : this.lastName().toUpperCase(), 
            "#{LOWERCASE_LIBRARY_NAME}#" : this.lastName().toLowerCase()
        }
    }


    defineResolve(outStr) 
    {
        return outStr 
    }
}

export default LibraryScaffolder;