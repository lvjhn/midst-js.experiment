/** 
 * LIBRARIES REGISTRY FILE
 * Central registration file for libraries 
 */

/** 
 * Load non-conditionally loaded libraries here.
 */

// ===== core ===== //
import LoadVueRouter from "@libraries://core/vue-router" 
await LoadVueRouter(); 

import LoadPinia from '@libraries://core/pinia'
await LoadPinia();

// ===== clients ===== //
import loadAxios from "@libraries://clients/axios"
await loadAxios();

import loadGraphQLRequest from "@libraries://clients/graphql-request"
await loadGraphQLRequest(); 

import loadLaravelEcho from "@libraries://clients/laravel-echo"
await loadLaravelEcho(); 

// ===== ui ===== //
import loadVueApexCharts from "@libraries://ui/vue-apexcharts"
await loadVueApexCharts();

import loadVueDraggable from "@libraries://ui/vue-draggable"
await loadVueDraggable(); 

// ===== utils ===== //
import loadChance from "@libraries://utils/chance"
await loadChance();

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

}