<template>
    <div id="app">
        <!-- <HelloWorld /> -->
        <router-view/>
    </div>
</template>

<script>
    // import HelloWorld from './components/nodes-graph/nodes-graph.vue'

    export default {
        name: 'app',
        components: {
            // HelloWorld
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>