/** 
 * APPLICATION ENTRY SCRIPT  
 */
import AppLoader from "@start://AppLoader"

/** Main Function of the Application*/
async function main() {

    /**
     * You can add code to run before the app is loaded here. 
     */

    const appLoader = new AppLoader(); 
    await appLoader.initApp();

    /** 
     * You can add code to run after the app is mounted here.
     */
}

/** Run main function. */
console.log("# @/main.js: Starting AppLoader...")
main()
    .then(() => {
        console.log("# @/main.js: Finished using AppLoader.")
    })
    .catch((err) => {
        console.error("# @/main.js: There was an error in loading the app"); 
        console.error(err);
    });