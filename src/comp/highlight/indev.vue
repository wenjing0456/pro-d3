<template>
    <span :title="text" v-html="highlight"></span>
</template>

<script>
    export default {
        name: 'highlight',
        components: {
            
        },
        props:{
            keywords:{
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
        computed:{
            highlight(){
                var keywords = this.keywords,
                    text = this.text;
                if(keywords && !(keywords instanceof Array)){//string
                    keywords = [keywords];
                }
                if(!text || keywords.length === 0){
                    return text;
                }

                
                return 'xxx'
            }
        },
        methods:{
            init(){
                console.log(this.keyword instanceof Array)
            }
        },
        mounted(){
            this.init()
        }
        
    }
</script>

<style>

</style>