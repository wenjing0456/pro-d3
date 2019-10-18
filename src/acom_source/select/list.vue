<template src="./list.html"></template>
<script>
    import { indexOf } from "./util";
    import HighLight from "../highlight";
    export default {
        name: 'mg-select-list',
        components:{
            'mg-highlight':HighLight
        },
        props:{
            identify:{
                type:String,
                default:'id'
            },
            level:{
                type:Number,
                default:0
            },
            display:{
                type:String,
                default:'name'
            },
            keyword:{
                type:String,
                default: ''
            },
            items:{
                type:Array,
                default: function () {
                    return [];
                }
            },
            select:{
                type:Array,
                default: function () {
                    return [];
                }
            },
            iconPosition:{
                type:String,
                default:'right'
            }
        },
        data: function () {
            return {

            };
        },
        methods:{
            isSelect: function (item) {
                var selects = this.select;
                if(!selects){
                    return false;
                }
                if(!(selects instanceof Array)){
                    selects = [selects];
                }
                return indexOf(selects,item,this.identify) >= 0;
            },
            hasChildren: function (item) {
                return item.children && item.children.length;
            },
            toggleSelect: function (item) {
                if(item.disabled){
                    this.toggleExpand(this.items,item);
                    return;
                }
                this.$emit('change',item);
            },
            toggleExpand: function (items,item) {
                item.expand = !item.expand;
                item._expand = item.expand;
                items.splice(items.indexOf(item),1,item);
            }
        }
    }
</script>
