<!--
   | COMPONENT FILE
   | Type: subroot
   | Name: subroot
  --> 

<!-- Script Section ----------------------------------------------------------------------------------------------------------->
<script setup> 
    /** ===== Imports =============== */
    import { ref, computed, watch, onMounted, getCurrentInstance, defineAsyncComponent } from 'vue' 
    import { useWindowSize } from 'vue-window-size'
    import RuntimeFacade from '@facades://RuntimeFacade'
    import _ from 'lodash'

    import subroot from "./subroot.vue"

    /** ===== Set-up =============== */
    const instance = getCurrentInstance(); 
    const props = defineProps([ "subroots" ]); 
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
    <component 
        component-type="subroot"
        component-name="subroot"
        ref="self"
        :is="subroots[0]"
       > 
        <subroot 
            v-if="subroots.slice(1).length > 0" 
            :subroots="subroots.slice(1)" > 
            <slot /> 
        </subroot>
        <slot v-else />
    </component> 
</template> 

<!-- Style Section ------------------------------------------------------------------------------------------------------------> 
<style scoped> 
    [component-name="App"] 
    {
        display: inherit;
    }
</style> 