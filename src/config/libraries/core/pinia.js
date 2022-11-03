import { createPinia } from "pinia";

/**
 * PINIA SET-UP SCRIPT 
 * This script configures pinia - #{LIBRARY_DESCRIPTION}#.
 */
export default async () => {

    console.log("@ Lib. Setup : Setting up pinia...");

    // ===== get application instance ====== // 
    const app = $app.instance; 

    // ===== create pinia instance ===== // 
    const pinia = createPinia(); 

    // ===== use pinia instance ===== // 
    app.use(pinia);
}