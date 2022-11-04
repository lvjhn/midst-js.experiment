<!--
   | COMPONENT FILE
   | Type: app-root
   | Name: App
  --> 

<!-- Script Section ----------------------------------------------------------------------------------------------------------->
<script setup> 
    /** ===== Imports =============== */
    import { ref, computed, watch, onMounted, getCurrentInstance, defineAsyncComponent } from 'vue' 
    import { useWindowSize } from 'vue-window-size'
    import _ from 'lodash'

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
    onMounted(() => {
        const refs = instance.refs; 
        resizeTrait();
    })

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
    <div 
        component-type="app-root"
        component-name="App"
        ref="self"> 
        <router-view />
    </div> 
</template> 

<!-- Style Section ------------------------------------------------------------------------------------------------------------> 
<style scoped> 
    [component-name="App"] 
    {
        display: inherit;
    }
</style> 