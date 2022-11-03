/** 
 * PWA REGISTRY FILE
 * Central registration file for PWA related setup such as service workers
 */
export default async () => {
    if(import.meta.env.PROD) {
        if ("serviceWorker" in navigator) {
            const updateSW = registerSW({
                onNeedRefresh() {
                    Toastify({
                        text: `<div style="font-family: arial"> 
                                <h4 style='display: inline;'>An update is available!</h4>
                                <br><br>
                                <a class='do-sw-update'>Click to update and reload</a>
                            </div>`,
                        escapeMarkup: false,
                        gravity: "bottom",
                        onClick() {
                            updateSW(true);
                        }
                    }).showToast();
                }
            });
        }
    }
}