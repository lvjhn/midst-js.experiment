/** 
 * INSTALL HELPER 
 * Helpers for installing the pwa-version of the app. 
 */
class InstallerHelper 
{
    /**
     * Show install prompt
     */
    static showInstallPrompt() 
    {
        if(import.meta.env.APP_RUNTIME_MODE == "production")
            $appInstallerDeferredPrompt.prompt(); 
        else 
            alert("You are in development mode.\n" + 
                "The install prompt should appear in production mode.")
    }
    
    /** 
     * Check if application is installable
     */
    static isInstallable() 
    {
        return "onbeforeinstallprompt" in window; 
    }

    /**
     * Check if application is installed
     */
    static isInstalled() 
    {
        if(InstallerHelper.isInstallable()) {
            return $appInstallerDeferredPrompt ? false : true; 
        }
        return false; 
    }
}   

export default InstallerHelper;