import Subroot from "#site://subroot.vue"
import Main from "#site://main.js"
const $app = window.$app

export default async ()  => {

    if(!$app.site) 
        $app.site = {};
    
    $app.site.subroot = Subroot 
    $app.site.main = Main
    
    const route = $app.libraries.router.currentRoute._value;
    
    $app.site.route = route;
    $app.site.moduleIdx = route.meta.$module;

    const chain = await $app.facades.ModulesFacade.modMainChain(); 

    $app.site.modMainChain = chain;

    $app.site.runModMains = async () => {
        for(let mainFn of $app.site.modMainChain) {
            await mainFn();
        }
    }

}

