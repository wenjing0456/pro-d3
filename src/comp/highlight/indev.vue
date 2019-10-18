<template>
    <div class="container">
        
    </div>
</template>

<script>
    export default {
        name: 'highlight',
        components: {
            
        },
        props:{
            keyword:{
                type:String|Array,
                default:''
            },
            text:{
                type:String,
                default:''
            },
            ignoreCase:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            
        }
    }
</script>

<style>

</style>