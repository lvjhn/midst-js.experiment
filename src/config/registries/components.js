
/** 
 * COMPONENTS REGISTRY FILE
 * Central registration file for global components
 */
import { defineAsyncComponent } from "vue";

export default async () => {
    console.log("# App. Loader :: Components Registry  : Loading global components...")

    /** ===== APP INSTANCE ===== */
    const app = $app.instance;

    /** ===== VIEW WRAPPERS (for diff. targets) ===== */
    app.component(
        "mobile-view", 
        defineAsyncComponent(() => import("@start://prefabs/views/mobile-view.vue"))
    ); 
    app.component(
        "www-view", 
        defineAsyncComponent(() => import("@start://prefabs/views/www-view.vue"))
    ); 
    app.component(
        "common-view", 
        defineAsyncComponent(() => import("@start://prefabs/views/common-view.vue"))
    )

}