/** 
 * STORE FILE
 */
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

const STORE_ID = "#{STORE_ID}#"

export default defineStore(STORE_ID, () => {    
    const data = useStorage(STORE_ID, {});
    return { data }; 
}); 