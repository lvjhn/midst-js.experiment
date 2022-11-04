import Subroot from "#site://subroot.vue"
import Main from "#site://main.js"

export default async ()  => {
    $app.runtime.subroot = Subroot 
    $app.runtime.main = Main
    $app.facades.Runtime.commonRegistration();
}

