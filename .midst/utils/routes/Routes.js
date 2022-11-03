/**
 * ROUTES UTILITY CLASS
 */
import fs from 'fs'

import Modules from '../modules/Modules.js';

class Routes
{    
    /**
     * Scan for modules, updating every _modules.js in the project.
     */
    static async scan() 
    {
        async function scanForModule(moduleId) 
        {
            const modulePath = Modules.path(moduleId);
            const sitesPath = modulePath + "/@sites"; 
            const sites = ["www", "mobile", "common"]; 

            for(let site of sites) {
                const sitePath = sitesPath + "/" + site ; 
                const routesPath = sitePath + "/routes"; 
                const viewsPath = sitePath + "/views"; 
                const autoRoutesFile = routesPath + "/_auto.js"
                const viewList = await scanViewTree(viewsPath, "");
                writeViewList(autoRoutesFile, viewList); 
            }

            const submodules = Modules.submodules(moduleId); 
            for(let submoduleId of submodules) {
                scanForModule(moduleId + "." + submoduleId);
            }
        }

        async function scanViewTree(viewsPath, prefix) 
        {
            let views = []; 

            const viewFiles = fs.readdirSync(viewsPath); 

            
            for(let viewFile of viewFiles) {
                const nameTokens = viewFile.split(".");
                
                if(viewFile[0] == "_") continue; 

                const prefixed =  prefix + "/" + viewFile;
                if(fs.existsSync(viewsPath + "/" + viewFile) && 
                   fs.lstatSync(viewsPath + "/" + viewFile).isDirectory()) {
                    views = [...views, ...await scanViewTree(viewsPath + "/" + viewFile, prefixed) ] 
                    continue;
                }

                if(nameTokens.at(-1) != "vue") continue;

                const name = nameTokens.slice(0, nameTokens.length - 1).join("."); 
                
                const regItem = { path: prefix + "/" + name, component: prefix + "/" + name + ".vue" }
                views.push(regItem);
            }

            return views;
        }

        async function writeViewList(autoRoutesFile, viewList) 
        {
            let js = ""; 
            
            js += "export default \n["
            for(let listItem of viewList) {
                js += "\n\t{\n";
                js += `\t\tpath: "${listItem.path}",\n`;
                // js += `\t\tcomponent: () => import("^/midst.js")\n`;
                js += "\t},";
            }
            js += "\n]";

            fs.writeFileSync(autoRoutesFile, js);
        }

        await scanForModule("app");
    }
}

export default Routes; 