const { createApp } = Vue


$app._preload.loadingScreen = 
    createApp({
        data () {
            return {
                "message" : "hello"
            }
        }
    })
    .mount("#__loading-screen");