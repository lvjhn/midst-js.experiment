
/**
 * MODULE COMMANDS
 * Defines different commands for module context.
 */
import colors from 'colors'
import Modules from '../../utils/modules/Modules.js';

import ModuleScaffolder from "../../scaffolders/ModuleScaffolder.js";
import ViewScaffolder from '../../scaffolders/ViewScaffolder.js';
import ComponentScaffolder from '../../scaffolders/ComponentScaffolder.js';
import LayoutScaffolder from '../../scaffolders/LayoutScaffolder.js';
import StoreScaffolder from '../../scaffolders/StoreScaffolder.js';

class ModuleCommands 
{
    constructor(context) 
    {
        this.context = context; 
    }

    /**
     * Handle command, route args to proper command handler.
     */
    async handle() 
    {
        const { context, command, options, kwOptions } = this.context.parsedArgs;


        // ----- modules ----- //
        if(command == "create:module")
            this.createModule(); 
        else if(command == "delete:module")
            this.deleteModule();
            
        // ----- views ----- //
        else if(command == "create:view") 
            this.createView(); 
        else if(command == "delete:view")   
            this.deleteView();
            
        // ----- component ----- //
        else if(command == "create:component") 
            this.createComponent(); 
        else if(command == "delete:component")   
            this.deleteComponent();

        // ----- layout ----- //
        else if(command == "create:layout") 
            this.createLayout(); 
        else if(command == "delete:layout")   
            this.deleteLayout();

        // ----- store ----- //
        else if(command == "create:store") 
            this.createStore(); 
        else if(command == "delete:store")   
            this.deleteStore();

        else {
            console.log(colors.red("@ Unknown command [" + command + "]")); 
            process.exit();
        }
    }

    /** ===== HELPER FUNCTIONS ===== */

    /**
     * Get the full module id from the supplied arguments.
     */
    fullModuleId() 
    {
        const { context, options } = this.context.parsedArgs;

        const head = context;
        const tail = options[0];
        const moduleId = head + (tail ? "." + tail : "");

        return moduleId;
    }

    /** ===== MODULE COMMANDS ===== */

    /**
     * Module creation command handler
     */
    async createModule() 
    {
        const { context, command, options, kwOptions } = this.context.parsedArgs;
        const moduleId = this.fullModuleId(); 

        console.log("@ Creating module [" + moduleId + "]."); 
        await ModuleScaffolder.create(moduleId, kwOptions); 
        await Modules.scan();
        console.log(colors.green("@ Done."));
    }

    /**
     * Module deletion command handler
     */
    async deleteModule() 
    {
        const { context, command, options, kwOptions } = this.context.parsedArgs;
        const moduleId = this.fullModuleId(); 

        console.log("@ Deleting module [" + moduleId + "]"); 
        await ModuleScaffolder.delete(moduleId); 
        await Modules.scan();
        console.log(colors.green("@ Done."));
    }

    /** ===== VIEW COMMANDS ===== */

    /**
     * Generic Modular Scaffolder
     */
    async genericModularScaffolding(label, Scaffolder, mode) 
    {
        const { context, command, options, kwOptions } = this.context.parsedArgs;
        const moduleId = context;

        let operation;

        if(mode == "create") 
            operation = "Creating"
        else if(mode == "delete") 
            operation = "Deleting"

        console.log("@ " + operation + " " + label + " [" + moduleId + ":" + options[0] + ":" + options[1] + "]."); 
        const scaffolder = new Scaffolder(moduleId, options[1], options[0], kwOptions);
        scaffolder[mode](); 
        console.log(colors.green("@ Done."));
    }

    /**
     * View creation command handler
     */
    async createView() 
    {
        await this.genericModularScaffolding("view", ViewScaffolder, "create");
    }

    /**
     * View deletion command handler
     */
    async deleteView() 
    {
        await this.genericModularScaffolding("view", ViewScaffolder, "delete");
    }

    /**
     * Layout creation command handler
     */
    async createLayout() 
    {
        await this.genericModularScaffolding("layout", LayoutScaffolder, "create");
    }

    /**
     * Layout deletion command handler
     */
    async deleteLayout() 
    {
        await this.genericModularScaffolding("layout", LayoutScaffolder, "delete");
    }

    /**
     * Component creation command handler
     */
    async createComponent() 
    {
        await this.genericModularScaffolding("component", ComponentScaffolder, "create");
    }

    /**
     * Component deletion command handler
     */
    async deleteComponent() 
    {
        await this.genericModularScaffolding("component", ComponentScaffolder, "delete");
    }

    /** 
     * Store creation command handler
     */
    async createStore() 
    {
        await this.genericModularScaffolding("store", StoreScaffolder, "create");
    }

    /** 
     * Store deletion command handler
     */
    async deleteStore() 
    {
        await this.genericModularScaffolding("store", StoreScaffolder, "delete");
    }
}

export default ModuleCommands;