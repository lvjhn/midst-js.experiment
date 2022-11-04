<!--
   | COMPONENT FILE
   | Type: www-view
   | Name: home
  --> 

<!-- Script Section ----------------------------------------------------------------------------------------------------------->
<script setup> 
    /** ===== Imports =============== */
    import { ref, computed, watch, onMounted, getCurrentInstance, onBeforeMount } from 'vue' 
    import registerSite from "#site://.site/register"
    import RuntimeFacade from '@facades://RuntimeFacade'
    import SiteView from '@start://prefabs/views/www-view.vue'
    import { useWindowSize } from 'vue-window-size'

    /** ===== Set-up =============== */
    const instance = getCurrentInstance(); 
    const props = defineProps([]); 
    const emits = defineEmits([]); 
    const { width: windowWidth, height: windowHeight} = useWindowSize();

    /** ===== Data =============== */
    // const foo = ref("hello");
    // const bar = ref("world!"); 
    // const baz = computed(() => foo.value + bar.value); 

    /** ===== Lifecycle =============== */
    

    onBeforeMount(async () => {
        await initRuntime(); 
    }) 

    onMounted(async () => {
        const refs = instance.refs; 

        await reloadContext();

        /** ----------------------- */

        // custom code //

        /** ----------------------- */
    })

    async function initRuntime() 
    {
        await registerSite();
    }

    async function reloadContext() 
    {
        await registerSite();
        await RuntimeFacade.runModMains();
        await RuntimeFacade.runSiteMain(); 
        resizeTrait();
    }

    function resizeTrait() {
        handleResize(); 
        watch([ windowWidth, windowHeight ], handleResize);
    }

    /** ===== Functions =============== */
    function handleResize() {
        const refs = instance.refs; 
        const self = refs.self;
    } 

</script> 

<!-- Template Section ---------------------------------------------------------------------------------------------------------> 
<template> 
    <site-view 
        component-type="www-view"
        component-name="home"
        ref="self"> 
        <root-layout> 
            Hello, World! - from <b>home</b>
        </root-layout>
    </site-view> 
</template> 

<!-- Style Section ------------------------------------------------------------------------------------------------------------> 
<style scoped> 
    [component-name="home"] 
    {
        display: inherit;
    }
</style> 