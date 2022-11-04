<!--
   | COMPONENT FILE
   | Type: root-layout
   | Name: root-layout
  --> 

<!-- Script Section ----------------------------------------------------------------------------------------------------------->
<script setup> 
    /** ===== Imports =============== */
    import { ref, computed, watch, onMounted, getCurrentInstance, defineAsyncComponent, shallowRef } from 'vue' 
    import { useWindowSize } from 'vue-window-size'
    import RuntimeFacade from '@facades://RuntimeFacade'
    import _ from 'lodash'

    import subroot from "../components/subroot.vue"

    /** ===== Set-up =============== */
    const instance = getCurrentInstance(); 
    const props = defineProps([]); 
    const emits = defineEmits([]); 
    const { width: windowWidth, height: windowHeight} = useWindowSize();

    /** ===== Data =============== */
    const subroots = shallowRef([]);
    
    const _subroots_ = RuntimeFacade.subrootChain();
    for(let subroot of _subroots_) 
        subroots.value.push(defineAsyncComponent(subroot)); 

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
    <subroot 
        component-type="subroot"
        :component-name="subroots[0] + '-layout'"
        :subroots="subroots"
        :view="getCurrentInstance()"
        ref="self">
        <slot />
    </subroot> 
</template> 

<!-- Style Section ------------------------------------------------------------------------------------------------------------> 
<style scoped> 
    [component-name="root-layout"] 
    {
        display: inherit;
    }
</style> 