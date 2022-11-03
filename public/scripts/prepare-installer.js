/**
 * INSTALLER PREPARATION SCRIPT
 */
window.$appInstallerDeferredPrompt = false; 

window.addEventListener('beforeinstallprompt', (e) => {
    console.log("@ index.html: beforeinstallprompt event fired.")
    window.$appInstallerDeferredPrompt = e; 
});
 