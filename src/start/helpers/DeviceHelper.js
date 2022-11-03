/**
 * DEVICE HELPER
 * Contains functions for getting basic information about the device.
 */
class DeviceHelper 
{
    /**
     * Different checks for different devices. 
     */
    static detectMobileDevice() 
    {
        const deviceChecks = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i) || 
                       navigator.userAgent.match(/WPDesktop/i);
            }
        }; 

        return deviceChecks; 
    }

    /**
     * Get the device name of the current device if it is mobile. 
     */
    static whichMobileDevice() 
    {   
        let mobileDeviceName = null; 
        const deviceChecks = DeviceHelper.detectMobileDevice(); 

        for(let deviceName in deviceChecks) {
            const checkDevice = deviceChecks[deviceName]; 
            if(checkDevice()) 
                return deviceName; 
        }

        return mobileDeviceName; 
    }

    /** 
     * Check if user is using a mobile device
     */
    static isMobileDevice() 
    {
        let isMobileDevice = false; 

        if(DeviceHelper.whichMobileDevice() != null) 
            return true;

        return isMobileDevice; 
    }
}

export default DeviceHelper; 