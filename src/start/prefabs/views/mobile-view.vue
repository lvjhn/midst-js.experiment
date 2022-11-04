<!--
   | COMPONENT FILE
   | Type: mobile-view
   | Name: mobile-view
  --> 

<!-- Script Section ----------------------------------------------------------------------------------------------------------->
<script setup> 
    /** ===== Imports =============== */
    import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue' 
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
    onMounted(async () => {
        const refs = instance.refs; 

        /** ----------------------- */

        // custom code //

        /** ----------------------- */
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
        component-type="mobile-view"
        component-name="mobile-view"
        ref="self"> 
        <slot />
    </div> 
</template> 

<!-- Style Section ------------------------------------------------------------------------------------------------------------> 
<style scoped> 
    [component-name="mobile-view"] 
    {
        display: inherit;
    }
</style> 