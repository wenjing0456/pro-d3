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
                keywords = keywords.map(function(keyword){
                    return keyword.replace(/(\?|\(|\)|\.|\+)/g,'\\$1');
                })
                var options = ['g'];
                if(this.ignoreCase){
                    options.push('i');
                }
                keywords.forEach(keyword => {
                    var regexp = keyword;
                    regexp = new RegExp(keyword,options.join(''));
                    text.replace(regexp,function(all,index){
                        
                    })
                });
                return '<i class="mg-highlight">'+ text +'</i>';
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
    .mg-highlight{
        color: #fff;
        background: burlywood;
    }
</style>