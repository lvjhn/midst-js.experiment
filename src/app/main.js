/** 
 * MODULE MAIN FILE
 * Important Note: 
 * This module is pre-bundled and optimized (Dependency Pre-bundling).
 * When changing this file, you have to restart the server manually using 
 * `node midst --hard-restart`.
 */
import runners from '@utils://runners'

export default async () => {
    
    runners.moduleOnce(() => {
        alert("Hello!");
    });

}