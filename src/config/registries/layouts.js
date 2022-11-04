/** 
 * LAYOUTS REGISTRY FILE
 * Central registration file for global layouts
 */
import { defineAsyncComponent } from "vue";


export default async () => {
    console.log("# App. Loader :: Layouts Registry : Loading global layouts...")

    /** ===== APP INSTANCE ===== */
    const app = $app.instance;

    /** ===== ROOT LAYOUT (modular subroots) ===== */
    app.component(
        "root-layout",  
        defineAsyncComponent(() => import("@start://prefabs/layouts/root-layout.vue"))
    ); 
    
}