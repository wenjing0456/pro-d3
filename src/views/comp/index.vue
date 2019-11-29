<template>
    <div id="app">
        <p>1234589</p>
        <highlight :keywords="keyword" :text="text"></highlight>
    </div>
</template>

<script>
    import highlight from '@/comp/highlight/indev.vue'
    export default {
        data(){
            return {
                text:'我12345.<>?+0876543',
                keyword:'我'
            }
        },
        components: {
            highlight
        },
        methods:{

        }
    }
</script>

<style>

</style>