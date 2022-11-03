/**
 * PWA HELPER
 * Contains helper functions for getting PWA related information.
 */
import Axios from 'axios'; 

class PWAHelper
{
    static async manifest() 
    {
        return (await Axios.get("/manifest.json")).data;
    }
}

export default PWAHelper;