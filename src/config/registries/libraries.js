/** 
 * LIBRARIES REGISTRY FILE
 * Central registration file for libraries 
 */

console.log("# App. Loader :: Library Registry : Loading libraries...");


const regFns = []; 

const register = (name, regFn) => {
    console.log(`# App. Loader :: Helpers Registry : Registering library ${name}.`)
    $app.registry.registerLibrary(name, regFn);
};

// ===== core ===== //
import loadVueRouter from "@libraries://core/vue-router" 
register("vue-router", loadVueRouter);

import loadPinia from '@libraries://core/pinia'
register("pinia", loadPinia);

// ===== clients ===== //
import loadAxios from "@libraries://clients/axios"
register("axios", loadAxios);

import loadGraphQLRequest from "@libraries://clients/graphql-request"
register("graphql-request", loadGraphQLRequest);

import loadLaravelEcho from "@libraries://clients/laravel-echo"
register("laravel-echo", loadLaravelEcho);

// ===== ui ===== //
import loadVueApexCharts from "@libraries://ui/vue-apexcharts"
register("vue-apexcharts", loadVueApexCharts);

import loadVueDraggable from "@libraries://ui/vue-draggable"
register("vue-draggable", loadVueDraggable);

// ===== utils ===== //
import loadChance from "@libraries://utils/chance"
register("chance", loadChance);

export default async () => {
    /** 
     * Libraries that require conditions to be loaded
     * are placed here and should be loaded using
     * 
     * if(Site.isMobile())
     *      await $app.load("@libraries://ui-cl/framework7-vue");
     * else 
     *      await $app.load("@libraries://ui-cl/element-plus");
     */

    $app.registry.registerLibraries();
}