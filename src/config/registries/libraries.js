/** 
 * LIBRARIES REGISTRY FILE
 * Central registration file for libraries 
 */

/** 
 * Load non-conditionally loaded libraries here.
 */

const libraries = [];

// ===== core ===== //
import loadVueRouter from "@libraries://core/vue-router" 
libraries.push(loadVueRouter);

import loadPinia from '@libraries://core/pinia'
libraries.push(loadPinia);

// ===== clients ===== //
import loadAxios from "@libraries://clients/axios"
libraries.push(loadAxios);

import loadGraphQLRequest from "@libraries://clients/graphql-request"
libraries.push(loadGraphQLRequest);

import loadLaravelEcho from "@libraries://clients/laravel-echo"
libraries.push(loadLaravelEcho);

// ===== ui ===== //
import loadVueApexCharts from "@libraries://ui/vue-apexcharts"
libraries.push(loadVueApexCharts);

import loadVueDraggable from "@libraries://ui/vue-draggable"
libraries.push(loadVueDraggable);

// ===== utils ===== //
import loadChance from "@libraries://utils/chance"
libraries.push(loadChance);

export default async () => {

    for(let runnable of libraries) {
        await runnable();
    }

    /** 
     * Libraries that require conditions to be loaded
     * are placed here and should be loaded using
     * 
     * if(Site.isMobile())
     *      await $app.load("@libraries://ui-cl/framework7-vue");
     * else 
     *      await $app.load("@libraries://ui-cl/element-plus");
     */

}