<template>
    <div id="app">
        <!-- <div>test</div> -->
        <HelloWorld />
        <button class="btn" @click="toColor">
            <router-link :to="{name: 'color'}" class="route">
                <span>to color</span>
            </router-link>
        </button>
        
    </div>
</template>

<script>
    //   import HelloWorld from './components/HelloWorld.vue'
      import HelloWorld from '../../components/nodes-graph/nodes-graph.vue'

    export default {
        name: 'app',
        components: {
            HelloWorld
        },
        methods:{
            toColor(){

            }
        }
    }
</script>

<style>

</style>